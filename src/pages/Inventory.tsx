import { useState } from 'react';
import { DashboardLayout } from '@/components/layout';
import { mockProducts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const statusStyles: Record<string, string> = {
  in_stock: 'badge-success',
  low_stock: 'badge-warning',
  out_of_stock: 'badge-destructive',
};

const InventoryPage = () => {
  const [products] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const inventoryStats = {
    total: products.length,
    inStock: products.filter((p) => p.status === 'in_stock').length,
    lowStock: products.filter((p) => p.status === 'low_stock').length,
    outOfStock: products.filter((p) => p.status === 'out_of_stock').length,
    totalValue: products.reduce((acc, p) => acc + p.price * p.stock, 0),
  };

  const handleEdit = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleDelete = (id: string) => {
    toast.success('Product deleted', {
      description: `Product ${id} has been removed from inventory.`,
    });
  };

  const handleSaveProduct = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    toast.success('Product saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Inventory
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your product inventory and stock levels
            </p>
          </div>
          <Button onClick={() => setIsAddOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="premium-card p-4">
            <Package className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">{inventoryStats.total}</p>
            <p className="text-xs text-muted-foreground">Total Products</p>
          </div>
          <div className="premium-card p-4">
            <div className="w-3 h-3 rounded-full bg-success mb-2" />
            <p className="text-2xl font-bold">{inventoryStats.inStock}</p>
            <p className="text-xs text-muted-foreground">In Stock</p>
          </div>
          <div className="premium-card p-4">
            <AlertTriangle className="h-5 w-5 text-warning mb-2" />
            <p className="text-2xl font-bold">{inventoryStats.lowStock}</p>
            <p className="text-xs text-muted-foreground">Low Stock</p>
          </div>
          <div className="premium-card p-4">
            <div className="w-3 h-3 rounded-full bg-destructive mb-2" />
            <p className="text-2xl font-bold">{inventoryStats.outOfStock}</p>
            <p className="text-xs text-muted-foreground">Out of Stock</p>
          </div>
          <div className="premium-card p-4 col-span-2 md:col-span-1">
            <p className="text-xs text-muted-foreground mb-1">Total Value</p>
            <p className="text-2xl font-bold">
              ${inventoryStats.totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="premium-card p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="premium-card p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'capitalize',
                    statusStyles[product.status]
                  )}
                >
                  {product.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">SKU: {product.sku}</span>
                <span className="font-semibold text-lg">
                  ${product.price.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Stock Level</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
                <Progress
                  value={Math.min((product.stock / 150) * 100, 100)}
                  className={cn(
                    'h-2',
                    product.stock === 0 && 'bg-destructive/20',
                    product.stock > 0 && product.stock <= 10 && 'bg-warning/20'
                  )}
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(product)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddOpen(false);
          setIsEditOpen(false);
          setSelectedProduct(null);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditOpen ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {isEditOpen
                ? 'Update the product information'
                : 'Enter the details of the new product'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  defaultValue={selectedProduct?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="XXXX-XX-000"
                  defaultValue={selectedProduct?.sku}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  defaultValue={selectedProduct?.price}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  defaultValue={selectedProduct?.stock}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue={selectedProduct?.category || 'Electronics'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Food">Food & Beverage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddOpen(false);
              setIsEditOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              {isEditOpen ? 'Save Changes' : 'Add Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InventoryPage;
