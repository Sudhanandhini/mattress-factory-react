import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight, Shield, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface UserItem {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  status?: string;   // 'ACTIVE' | 'SUSPENDED' — backend field name
  createdAt: string;
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function UsersPage() {
  const { token } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;

  const fetchUsers = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    params.set('page', String(page));
    params.set('limit', String(limit));

    fetch(`${API_URL}/admin/users?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        // Backend: { success, data: { users, pagination } }
        const list = Array.isArray(data) ? data : data.data?.users ?? data.users ?? [];
        setUsers(list);
        setTotal(data.data?.pagination?.totalItems ?? data.total ?? list.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, [search, page, token]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setSearchParams(next);
  };

  const toggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    await fetch(`${API_URL}/admin/users/${userId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchUsers();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">{total} total users</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            defaultValue={search}
            onKeyDown={e => {
              if (e.key === 'Enter') updateParam('search', (e.target as HTMLInputElement).value);
            }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No users found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">User</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => {
                const name = [u.firstName, u.lastName].filter(Boolean).join(' ') || '—';
                return (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1a2a6c]/10 flex items-center justify-center flex-shrink-0">
                          {u.role === 'ADMIN'
                            ? <Shield className="w-4 h-4 text-[#1a2a6c]" />
                            : <User className="w-4 h-4 text-[#1a2a6c]" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(u.id, u.status ?? 'ACTIVE')}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                          u.status !== 'SUSPENDED'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                        }`}
                      >
                        {u.status !== 'SUSPENDED' ? 'Active' : 'Suspended'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/admin/users/${u.id}`}
                        className="inline-flex items-center gap-1 text-[#1a2a6c] hover:underline text-xs font-medium"
                      >
                        View <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <p className="text-gray-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => updateParam('page', String(page - 1))}
              className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => updateParam('page', String(page + 1))}
              className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
