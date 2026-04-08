import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm, EMPTY_FORM, emptyImage, emptyFreebie, emptyVariant } from '@/components/admin/ProductForm';
import type { ProductFormData, ImageRow, SpecRow, FreebieRow, VariantRow } from '@/components/admin/ProductForm';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AddProductPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const [formData, setFormData] = useState<ProductFormData>(EMPTY_FORM);
  const [images, setImages] = useState<ImageRow[]>([emptyImage(true)]);
  const [specs, setSpecs] = useState<SpecRow[]>([{ label: '', value: '' }]);
  const [freebies, setFreebies] = useState<FreebieRow[]>([emptyFreebie()]);
  const [variants, setVariants] = useState<VariantRow[]>([emptyVariant()]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
          url: i.url,
          altText: i.altText,
          isPrimary: i.isPrimary,
        })),
        specifications: specs.filter(s => s.label && s.value),
        freebies: freebies.filter(f => f.name).map(f => ({ name: f.name, image: f.image })),
        variants: variants.filter(v => v.size && v.price).map(v => ({
          ...v,
          price: parseFloat(v.price),
          salePrice: v.salePrice ? parseFloat(v.salePrice) : null,
        })),
        categoryIds: selectedCategories,
      };

      const res = await fetch(`${API_URL}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Failed to create product');

      setSuccess('Product created successfully!');
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProductForm
      mode="add"
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
