import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import {
	merr,
	merr1,
	merr2,
	merr3,
	merr4,
	merr5,
	merr6,
	merr7,
	merr8,
	merr9,
	merr10,
	merr11,
	merr12,
	sky,
	logomer,
} from "../../assets";
const car1popular = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: false,
			mirror: false,
			anchorPlacement: "top-center",
		});
	}, []);
	const [selectedImage, setSelectedImage] = useState(merr11);

	const handleThumbnailClick = (image) => {
		setSelectedImage(image);
	};
	useEffect(() => {
		window.scrollTo(0, 0); // Cuộn đến tọa độ (0, 0) - tức là đầu trang
	}, []);


	return (
		<div>
			<div style={{ backgroundImage: `url(${sky})` }} className="min-h">
				<div
					data-aos="fade"
					className="bg-cover bg-center relative w-full  min-h-[700px] md:min-h-[800px] xl:min-h-[1000px]"
					style={{ backgroundImage: `url(${merr1})` }}
				>
					<div
						className="absolute inset-x-0 bottom-0 h-full"
						style={{
							backgroundImage: `url(${sky})`,
							WebkitMaskImage:
								"linear-gradient(to top, black, transparent)",
							maskImage:
								"linear-gradient(to top, black, transparent)",
						}}
					></div>

					<div className="flex justify-center">
						<div
							data-aos="zoom-in"
							className="bg-black bg-opacity-75 rounded-2xl font-thin absolute text-white top-24 transform text-center shadow-xl 
							md:w-[550px] w-[300px] p-2 md:p-5 "
						>
							<h1 className="text-2xl md:text-3xl lg:text-4xl mb-2 	tracking-widest font-bold animate-pulse duration-1000 ease-in-out transition-all ">
							Mercedes-Benz
							</h1>
							<h2 className="text-1xl md:text-2xl lg:text-3xl font-thin animate-pulse duration-1000 ease-in-out transition-all">
							Maybach 2022
							</h2>
						</div>
					</div>
					<div className="justify-center items-center flex">
						<div className="bg-black grid ss:grid-cols-2 gap-2 grid-cols-1 bg-opacity-75 rounded-2xl font-bold absolute text-white -bottom-1 transform -translate-y-1/2 shadow-xl xl:w-[1200px] md:w-[1000px] sm:w-[700px] ss:w-[500px] w-[300px] p-7 ">
							<div className="font-thin xl:text-2xl md:text-xl sm:text-sm text-start md:pl-40 ss:pl-1 pl-20 animate-pulse duration-1000 ease-in-out transition-all  ">
								<span className="font-bold">13.6</span>{" "}
								<span className="text-lg font-light">1/100 km</span>{" "}
								<br />
								<span className="font-bold">4.5s</span>{" "}
								<span className="text-lg font-light">
									0-100km/h
								</span>
								<br /> <span className="font-bold"> 463</span>{" "}
								<span className="text-lg font-light">KW</span>
							</div>
							<div className="hidden ss:block">
								<div className="font-thin xl:text-2xl md:text-xl sm:text-sm text-xs pr-3 animate-pulse duration-1000 ease-in-out transition-all">
									<span className="font-bold">
									The competitive line-up for the Mercedes Maybach
									</span>{" "}
									Serenity and uniqueness characterise the design. Underlined by the mighty chrome radiator grille with "Maybach" lettering and the bonnet trim on the powerful front section.
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* -------------------------phần 2 --------------*/}
				<div
					style={{ backgroundImage: `url(${sky})` }}
					className=" rounded-bl-3xl bg-center w-full min-h-screen relative object-cover  pt-12 justify-center items-center flex"
				>
					<div
						className="absolute h-full"
						style={{
							backgroundImage: `url(${sky})`,
						}}
					>
						<div className="flex justify-center items-center">
							<div
								data-aos="zoom-in-left"
								className="text-white relative font-thin text-2xl p-5 ss:p-16 top-0 sm:text-5xl animate-pulse duration-1000 ease-in-out transition-all"
							>
								MERCEDES
							</div>
							<div
								data-aos="zoom-in-right"
								style={{ backgroundImage: `url(${logomer})` }}
								className="w-24 bg-center h-28 bg-cover sm:h-36 animate-pulse duration-1000 ease-in-out transition-all"
							>
								{" "}
							</div>
						</div>
						<div
							data-aos="zoom-in"
							className="font-thin text-white md:text-2xl text-sm md:p-64 ss:p-14  p-12 pb-64 pt-44 text-center"
						>
							<span className="font-bold ">
								Mercedes-AMG CLS 53 4Matic+
							</span>{" "}
							is equipped with a turbocharged 3.0-liter I6 engine,
							generating maximum power of 435 horsepower and
							maximum torque of 520 Nm. This power is enhanced
							with a 48V hybrid drive system, providing an
							additional 250 Nm of torque and 16 kW of power when
							the driver needs it. All of this power will be
							transmitted to all four wheels through the 9-speed
							Speedshift TCT 9G dual-clutch transmission and
							4Matic+ drive system, thanks to which the car can
							accelerate to 100 km/h in 4.5 seconds. and top speed
							is limited to 250 km/h.
						</div>
						<div
							data-aos="zoom-in"
							style={{ backgroundImage: `url(${merr7})` }}
							className="bg-cover bg-center w-full  min-h-[700px] md:min-h-[800px] xl:min-h-[1000px] relative object-cover rounded-full rounded-tl-none rounded-br-none pt-[900px]"
						></div>
					</div>
				</div>
				{/* ------------tiêu đề------------------ */}
				<div className="relative xl:pt-[1400px] lg:pt-[1400px] md:pt-[1500px] sm:pt-[1000px] xs:pt-[1200px] ss:pt-[700px] pt-[1100px]">
					<div
						data-aos="flip-left"
						className="font-thin text-blue-200 relative text-sm ss:text-2xl  md:text-6xl sm:text-4xl text-center pb-[100px] "
					>
						SIGNIFICANTLY SHARPER - LIKE YOUR EYES
					</div>
					{/* ------------ảnh 1------------------ */}
					<div className="pt-0 md:pt-[20px] flex">
						<div
							data-aos="slide-right"
							className="font-thin text-white text-xs ss:text-sm sm:text-xl xl:text-2xl md:p-24 p-2 xs:p-12"
						>
							In addition to the newly launched upgraded version
							of the CLS-Class, Mercedes-Benz also offers
							customers the high-performance Mercedes-AMG CLS 53
							4Matic+ version of this car model.
						</div>
						<div className="justify-end flex">
							<div
								data-aos="slide-left"
								className="relative bg-cover w-[200px] h-[300px] ss:w-[400px] ss:h-[500px] sm:w-[500px] sm:h-[600px] md:w-[700px] md:h-[600px] xl:w-[1000px] xl:h-[900px] rounded-bl-full"
								style={{ backgroundImage: `url(${merr8})` }}
							></div>
						</div>
					</div>
					{/* ------------ảnh 2------------------ */}
					<div className="pt-[100px] flex">
						<div className="justify-start flex">
							<div
								data-aos="slide-right"
								className="relative bg-cover w-[200px] h-[300px] ss:w-[400px] ss:h-[500px] sm:w-[500px] sm:h-[600px] md:w-[600px] md:h-[500px] xl:w-[1000px] xl:h-[900px] rounded-br-full"
								style={{ backgroundImage: `url(${merr9})` }}
							></div>
						</div>
						<div
							data-aos="slide-left"
							className="font-thin text-white text-xs ss:text-sm sm:text-xl xl:text-2xl md:p-32 p-2 xs:p-12"
						>
							In addition to the newly launched upgraded version
							of the CLS-Class, Mercedes-Benz also offers
							customers the high-performance Mercedes-AMG CLS 53
							4Matic+ version of this car model. 
						</div>
					</div>
				</div>

				{/* 3D car------------------------------------------- */}
				<div className="">
					<div
						data-aos="zoom-out"
						className="font-thin text-blue-200 relative text-3xl ss:text-2xl  md:text-6xl sm:text-4xl text-center pt-[200px]"
					>
						3D MODEL
					</div>
					<div className="sketchfab-embed-wrapper w-[1000x] md:h-[900px] h-[500px] pt-16 ">
						{" "}
						<iframe
							className="w-full md:h-[500px] h-[300px] scale-125 md:scale-150"
							title="Mercedes-Benz Maybach 2022"
							frameborder="0"
							allowfullscreen
							mozallowfullscreen="true"
							webkitallowfullscreen="true"
							allow="autoplay; fullscreen; xr-spatial-tracking"
							xr-spatial-tracking
							execution-while-out-of-viewport
							execution-while-not-rendered
							web-share
							src="https://sketchfab.com/models/979f37a878f04b2a8d888b62ea6027e9/embed?autospin=1&autostart=1&preload=1&ui_theme=dark"
						>
							{" "}
						</iframe>{" "}
					</div>
				</div>
				{/*----------------------- banner -------------------------*/}
				<div className="flex">
					<div
						data-aos="slide-left"
						className="relative bg-cover bg-center w-[200px] h-[150px] xs:w-[300px] xs:h-[200px] ss:w-[500px] ss:h-[300px] sm:w-[600px] sm:h-[400px] md:w-[800px] md:h-[500px] xl:w-[1000px] xl:h-[500px] rounded-tr-full"
						style={{ backgroundImage: `url(${merr2})` }}
					></div>
					<div
						data-aos="slide-right"
						className="font-thin text-blue-200 relative text-xl ss:text-3xl sm:text-5xl xl:text-6xl justify-center items-center flex left-10 ss:left-12 sm:left-7 md:left-32 xs:left-20"
					>
						CAR BEHIND
					</div>
				</div>
				{/* ---------------CAR behind--------------------------------- */}
				<div data-aos="slide-up" className="pt-12">
					<div className="flex pt-20 row-span-2">
						{/*  các thumbnail */}
						<div className="md:w-[300px] w-[150px] p-4 flex max-h-[calc(900vh-1000px)]">
							<div className="flex flex-col space-y-4 flex-grow ">
								{[merr11, merr12, merr5, merr4, merr1].map(
									(image, index) => (
										<div
											key={index}
											className="w-full object-cover"
											onClick={() =>
												handleThumbnailClick(image)
											}
										>
											<img
												src={image}
												alt=""
												className="w-full object-cover hover:scale-110 transition-all ease-in-out duration-400 rounded-xl"
											/>
										</div>
									)
								)}
							</div>
						</div>

						{/* ảnh lớn */}
						<div className="w-full relative pl-2 justify-end items-end flex">
							<div
								className="bg-cover bg-center w-full h-full object-cove rounded-3xl"
								style={{
									backgroundImage: `url(${selectedImage})`,
								}}
							></div>
						</div>
					</div>
				</div>

				{/* -------------------------banner --------------------------*/}

				<div className="pt-[300px] flex">
					<div
						data-aos="slide-right"
						className="font-thin text-white text-xs ss:text-sm sm:text-xl xl:text-2xl md:p-24 p-2 xs:p-12"
					>
						Two AMG Night Package and Night Package II equipment
						packages are standard equipment. Finally, the car is
						equipped with welcome lights with a three-dimensional
						AMG logo displayed on the ground when opening the door.
					</div>
					<div className="justify-end flex">
						<div
							data-aos="slide-left"
							className="relative bg-cover w-[200px] h-[300px] ss:w-[400px] ss:h-[500px] sm:w-[500px] sm:h-[600px] md:w-[700px] md:h-[600px] xl:w-[1000px] xl:h-[900px] rounded-bl-full"
							style={{ backgroundImage: `url(${merr})` }}
						></div>
					</div>
				</div>
				<div className="pt-[1px] flex">
					<div className="justify-start flex">
						<div
							data-aos="slide-left"
							className="relative bg-cover w-[200px] h-[300px] ss:w-[400px] ss:h-[500px] sm:w-[500px] sm:h-[600px] md:w-[600px] md:h-[500px] xl:w-[1000px] xl:h-[900px] rounded-br-full"
							style={{ backgroundImage: `url(${merr3})` }}
						></div>
					</div>
					<div
						data-aos="slide-right"
						className="font-thin text-white text-xs ss:text-sm sm:text-xl xl:text-2xl md:p-32 p-2 xs:p-12"
					>
						Inside, the AMG Performance upgrade package will provide
						the interior with a steering wheel wrapped in Nappa
						leather or Dinamica fabric material. The interior is
						also covered with carbon fiber.
					</div>
				</div>

				{/* --------------------------conclusion --------------*/}
				<div
					data-aos="zoom-out"
					className="font-thin text-white md:text-2xl text-sm md:p-64 ss:p-14  p-12 pb-64 pt-44 text-center"
				>
					<span className="font-bold">
						The Mercedes-Benz Maybach 2022
					</span>{" "}
					is a great choice for those looking for a luxurious, <br />
					powerful sports car equipped with many advanced
					technologies.
				</div>
			</div>
		</div>
	);
};

export default car1popular;
