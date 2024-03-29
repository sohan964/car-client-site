import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';
import toast from 'react-hot-toast';

const Orders = () => {

    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([])



    useEffect(() => {
        fetch(`https://genius-car-server-murex-sigma.vercel.app/orders?email=${user?.email}`,{
            headers:{
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res =>{
                if(res.status ===401 || res.status === 403){
                    logOut();
                }
                return res.json()
            })
            .then(data => setOrders(data))
    },[user?.email]);

    const handleDelete = id =>{
        const proceed = window.confirm('Sure? you want to cancel');
        if(proceed){
            fetch(`https://genius-car-server-murex-sigma.vercel.app/orders/${id}`,{
                method: 'DELETE',
                headers:{
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    toast.success('Deleted Successfully');
                    const remanining = orders.filter(odr => odr._id !==id );
                    setOrders(remanining);
                    
                }
            });
        }
    }

    const handleStatusUpdate = id =>{
        fetch(`https://genius-car-server-murex-sigma.vercel.app/orders/${id}`,{
            method:'PATCH',
            headers:{
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`,
            },
            body: JSON.stringify({status:'Approved'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = orders.filter(odr => odr._id !==id);
                const approving = orders.find(odr => odr._id === id);
                approving.status = 'Approved';
                const newOrders = [...remaining, approving];
                setOrders(newOrders);

            }
        });
    }


    return (
        <div>
            <h2 className="text-5xl">Total Orders:{orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Remove
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order?._id}
                                order = {order}
                                handleDelete ={handleDelete}
                                setOrders = {setOrders}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;