import { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export default function CategoryForm({ category, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    featured: false,
    status: 'Active',
    ...category
  });

  useEffect(() => {
    if (category) {
      setForm({ ...category });
    }
  }, [category]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm(prev => ({
      ...prev,
      name,
      slug: !category ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : prev.slug
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.name) return;
    onSave({
      ...form,
      id: form.id || Date.now().toString(),
      products: form.products || 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-gray-50 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-full">
        <div className="px-6 py-4 border-b bg-white flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-vento-forest">{category ? 'Edit Category' : 'Add New Category'}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold text-vento-forest mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-600">Category Name *</label>
                    <input type="text" value={form.name} onChange={handleNameChange} required className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-vento-forest" placeholder="e.g. Wellness Teas" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-600">Slug *</label>
                    <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 outline-none" placeholder="wellness-teas" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gray-600">Rich Description</label>
                    <textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} rows={5} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-vento-forest" placeholder="Describe the category, benefits, and origin..."></textarea>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold text-vento-forest mb-4">Category Image</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                  <ImageIcon size={32} className="mb-2" />
                  <p className="text-sm font-semibold">Click to upload hero image</p>
                  <p className="text-xs">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold text-vento-forest mb-4">Visibility</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-semibold text-gray-700">Status</span>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="border rounded-full px-3 py-1 text-xs outline-none bg-vento-mint font-bold text-vento-forest">
                      <option>Active</option>
                      <option>Draft</option>
                    </select>
                  </label>
                  <hr/>
                  <label className="flex justify-between items-center cursor-pointer">
                    <div>
                      <p className="font-semibold text-sm">Featured Category</p>
                      <p className="text-xs text-gray-500">Highlight on homepage</p>
                    </div>
                    <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="accent-vento-forest w-4 h-4" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="px-6 py-4 border-t bg-white flex justify-end gap-3">
          <button onClick={onCancel} type="button" className="px-5 py-2 rounded-full font-bold text-sm text-gray-600 hover:bg-gray-100 border">Cancel</button>
          <button onClick={handleSubmit} type="submit" className="px-5 py-2 rounded-full font-bold text-sm bg-vento-forest text-white hover:bg-vento-gold hover:text-vento-forest transition-colors">Save Category</button>
        </div>
      </div>
    </div>
  );
}
