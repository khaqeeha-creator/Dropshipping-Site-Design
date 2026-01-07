import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

export function Checkout({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { items, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Create Customer
            const { data: customer, error: customerError } = await supabase
                .from('customers')
                .insert([{
                    full_name: formData.fullName,
                    email: formData.email,
                    shipping_address: { address: formData.address, city: formData.city, zip: formData.zip }
                }])
                .select()
                .single();

            if (customerError) throw customerError;

            // 2. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([{
                    customer_id: customer.id,
                    total_amount: total,
                    status: 'paid'
                }])
                .select()
                .single();

            if (orderError) throw orderError;

            // 3. Create Order Items
            const orderItems = items.map(item => ({
                order_id: order.id,
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                unit_price: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 4. Record Payment
            await supabase.from('payments').insert({
                order_id: order.id,
                amount: total,
                status: 'success',
                provider: 'mock_provider'
            });

            toast.success("Order placed successfully!");
            clearCart();
            onClose();

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Checkout</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input required
                                className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                value={formData.fullName}
                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input required type="email"
                                className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input required
                                className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input required
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">ZIP</label>
                                <input required
                                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                                    value={formData.zip}
                                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Total</span>
                            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Pay Now"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
