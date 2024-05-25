
import {Navbar, Hero, Product, Product2 ,Banner, Footer, CarBrand} from './_homepage'
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react"; // Import both useEffect and useRef

const RootLayout = () => {
    useEffect(() => {
		AOS.init({
			duration: 900,

			easing: "ease-in-out",
			once: false,
			mirror: true,
			anchorPlacement: "top-bottom",
		});
	}, []);
    return (
        <section className="w-full">
            <div className="w-full overflow-hidden bg-primary">
                    <div data-aos="zoom-out" className="flex items-start justify-center ">
                        <div className="w-full">
                            <Navbar />
                        </div>
                    </div>
                <div data-aos="zoom-out" className="flex items-start justify-center bg-primary">
                    <div className="w-full">
                        <Hero />
                    </div>
                </div>
                <div data-aos="zoom-out" className="flex items-start justify-center  bg-primary ">
                    <div className="w-full">
                        <Product />
                    </div>
                </div>
                <div data-aos="zoom-out" className="bg-primary flex items-start pt-12">
                    <div className="w-full">
                        <Product2 />
                    </div>
                </div>         
                <div data-aos="zoom-out" className="flex items-start justify-center bg-primary ">
                    <div className="w-full">
                        <Banner />
                    </div>
                </div>   
                <div data-aos="zoom-out" className="flex items-start justify-center bg-gray-950 bg-opacity-50">
                    <div className="w-full">
                        <CarBrand />
                    </div>
                </div>
                <div data-aos="zoom-out" className="flex items-start justify-center bg-primary">
                    <div className="w-full">
                        <Footer />
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default RootLayout
