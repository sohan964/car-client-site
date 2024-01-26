import React, { useEffect, useState } from 'react';
import ServiceCart from './ServiceCart';

const Services = () => {

    const [services, setServices] = useState();
    useEffect(() => {
        fetch('https://genius-car-server-murex-sigma.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])

    return (
        <div>
            <div className='text-center mb-4'>
                <p className='text-2xl font-bold text-orange-600'>Services</p>
                <h2 className="text-5xl font-semibold">Our Service Area</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, nemo?</p>
            </div>

            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                
                {
                    services?.map(service => <ServiceCart
                        key={service?._id}
                        service={service}
                    ></ServiceCart>)
                }
            </div>
        </div>
    );
};

export default Services;