import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm, emptyImage, emptyFreebie, emptyVariant } from '@/components/admin/ProductForm';
import type { ProductFormData, ImageRow, SpecRow, FreebieRow, VariantRow } from '@/components/admin/ProductForm';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState('');
  const [formData, setFormData] = useState<ProductFormData>({
    name: '', sku: '', shortDescription: '', description: '',
    basePrice: '', discountPrice: '', stock: '0', lowStockAlert: '10',
    brand: '', material: '', warranty: '', status: 'ACTIVE', isFeatured: false,
  });
  const [images, setImages] = useState<ImageRow[]>([emptyImage(true)]);
  const [specs, setSpecs] = useState<SpecRow[]>([{ label: '', value: '' }]);
  const [freebies, setFreebies] = useState<FreebieRow[]>([emptyFreebie()]);
  const [variants, setVariants] = useState<VariantRow[]>([emptyVariant()]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(json => {
        // Backend returns { success, data: product }
        const data = json.data ?? json;
        setProductName(data.name || '');
        setFormData({
          name: data.name || '',
          sku: data.sku || '',
          shortDescription: data.shortDescription || '',
          description: data.description || '',
          basePrice: String(parseFloat(data.basePrice) || ''),
          discountPrice: String(parseFloat(data.discountPrice) || ''),
          stock: String(data.stock || 0),
          lowStockAlert: String(data.lowStockAlert || 10),
          brand: data.brand || '',
          material: data.material || '',
          warranty: data.warranty || '',
          status: data.status || 'ACTIVE',
          isFeatured: data.isFeatured || false,
        });
        if (data.images?.length) {
          setImages(data.images.map((img: any) => ({
            id: img.id,
            url: img.url,
            altText: img.altText || '',
            isPrimary: img.isPrimary,
            preview: img.url,
            file: null,
            uploading: false,
          })));
        }
        if (data.specifications?.length) {
          setSpecs(data.specifications.map((s: any) => ({ id: s.id, label: s.label, value: s.value })));
        }
        if (data.freebies?.length) {
          setFreebies(data.freebies.map((f: any) => ({
            id: f.id,
            name: f.name,
            image: f.image || '',
            preview: f.image || '',
            file: null,
            uploading: false,
          })));
        }
        if (data.variants?.length) {
          setVariants(data.variants.map((v: any) => ({
            id: v.id,
            sizeGroup: v.sizeGroup || 'Queen',
            size: v.size || '',
            thickness: v.thickness || '',
            firmness: v.firmness || 'Medium',
            price: String(parseFloat(v.price) || ''),
            salePrice: v.salePrice ? String(parseFloat(v.salePrice)) : '',
          })));
        }
        if (data.categories?.length) {
          // Backend nests categories as [{ category: { id, name } }]
          setSelectedCategories(data.categories.map((c: any) => c.category?.id ?? c.id));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...formData,
        basePrice: parseFloat(formData.basePrice) || 0,
        discountPrice: parseFloat(formData.discountPrice) || 0,
        stock: parseInt(formData.stock) || 0,
        lowStockAlert: parseInt(formData.lowStockAlert) || 10,
        images: images.filter(i => i.url).map(i => ({
          id: i.id,
          url: i.url,
          altText: i.altText,
          isPrimary: i.isPrimary,
        })),
        specifications: specs.filter(s => s.label && s.value),
        freebies: freebies.filter(f => f.name).map(f => ({ id: f.id, name: f.name, image: f.image })),
        variants: variants.filter(v => v.size && v.price).map(v => ({
          id: v.id,
          sizeGroup: v.sizeGroup,
          size: v.size,
          thickness: v.thickness,
          firmness: v.firmness,
          price: parseFloat(v.price),
          salePrice: v.salePrice ? parseFloat(v.salePrice) : null,
        })),
        categoryIds: selectedCategories,
      };

      const res = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Failed to update product');

      setSuccess('Product updated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a2a6c]" />
      </div>
    );
  }

  return (
    <ProductForm
      mode="edit"
      productName={productName}
      formData={formData}
      images={images}
      specs={specs}
      freebies={freebies}
      variants={variants}
      selectedCategories={selectedCategories}
      submitting={submitting}
      error={error}
      success={success}
      onFormChange={setFormData}
      onImagesChange={setImages}
      onSpecsChange={setSpecs}
      onFreebiesChange={setFreebies}
      onVariantsChange={setVariants}
      onCategoriesChange={setSelectedCategories}
      onSubmit={handleSubmit}
      onErrorClose={() => setError('')}
    />
  );
}
