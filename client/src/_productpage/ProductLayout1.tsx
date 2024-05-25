import { Footer } from "@/_root/_homepage";
import Navbar from "./productHomePage/Navbar";
import Car1popular from "./productHomePage/car1popular";
const ProductLayout = () => {
	return (
		<section className="w-full">
			<div className="w-full overflow-hidden bg-primary">
				<div
					data-aos="zoom-out"
					className="flex items-start justify-center "
				>
					<div className="w-full">
						<Navbar />
					</div>
				</div>
                <div
					data-aos="zoom-out"
					className="flex items-start justify-center "
				>
					<div className="w-full">
						<Car1popular />
					</div>
				</div>
				<div
					data-aos="fade"
					className="flex items-start justify-center "
				>
					<div className="w-full">
						<Footer />
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductLayout;