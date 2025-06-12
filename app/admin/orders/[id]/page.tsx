'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function OrderDetail() {
	const { id } = useParams();
	const [orderStatus, setOrderStatus] = useState('Pending');
	const [note, setNote] = useState('');

	// Placeholder order detail
	const order = {
		id,
		customer: 'John Doe',
		services: 'GTA5 Money Boost - PC',
		total: '$9.99',
		paymentStatus: 'COMPLETED',
		orderStatus,
		date: '2023-10-01',
		transactionId: 'TX123456789'
	};

	const handleStatusChange = (newStatus: string) => {
		setOrderStatus(newStatus);
		// TODO: Persist update in Supabase.
	};

	return (
		<div className="p-8 bg-background min-h-screen">
			<h1 className="font-impact text-4xl mb-6 text-primary">Order Detail - #{order.id}</h1>

			<div className="mb-4 p-4 bg-[#1C1C1C] rounded-md">
				<p>
					<strong>Customer:</strong> {order.customer}
				</p>
				<p>
					<strong>Services:</strong> {order.services}
				</p>
				<p>
					<strong>Total:</strong> {order.total}
				</p>
				<p>
					<strong>Payment Status:</strong> {order.paymentStatus}
				</p>
				<p>
					<strong>Order Date:</strong> {order.date}
				</p>
				<p>
					<strong>Transaction ID:</strong> {order.transactionId}
				</p>
			</div>

			<div className="mb-4">
				<label className="block font-medium mb-2">Order Status:</label>
				<select
					value={orderStatus}
					onChange={(e) => handleStatusChange(e.target.value)}
					className="px-4 py-2 bg-[#1C1C1C] border border-border/40 rounded-md"
				>
					<option value="Pending">Pending</option>
					<option value="Processing">Processing</option>
					<option value="Completed">Completed</option>
					<option value="Cancelled">Cancelled</option>
				</select>
			</div>

			<div className="mb-4">
				<label className="block font-medium mb-2">Add Note:</label>
				<textarea
					value={note}
					onChange={(e) => setNote(e.target.value)}
					className="w-full px-4 py-2 bg-[#1C1C1C] border border-border/40 rounded-md"
					rows={4}
				/>
			</div>

			<div className="flex space-x-4">
				<button
					onClick={() => alert('Order updated')}
					className="px-4 py-2 bg-primary hover:bg-primary/90 rounded text-white"
				>
					Mark as Completed
				</button>
				<button
					onClick={() => alert('Order refunded')}
					className="px-4 py-2 bg-primary hover:bg-primary/90 rounded text-white"
				>
					Refund Order
				</button>
			</div>
		</div>
	);
}
