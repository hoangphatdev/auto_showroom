import React from "react";

import { MdDateRange } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { IoIosSpeedometer } from "react-icons/io";
const OverView = () => {
	return (
		<div className="w-full h-full justify-center items-center flex px-56 text-white">
			<div className="w-auto h-auto p-10 rounded-2xl border border-white">
				<h1 className="text-4xl text-center font-syncopate font-bold">
					Overview
				</h1>

				<hr className="w-full border-white border-opacity-30 relative top-3 py-3" />

				<div className="grid grid-cols-2 pt-5">
					<div className="justify-start items-center flex">
						<div className="grid grid-cols-2 gap-8 text-2xl ">
							<div className="flex">
								<MdDateRange className="w-7 h-auto" />
								<p className="pl-5 relative">2007</p>
							</div>
							<div className="flex ">
								<IoIosSpeedometer className="w-7 h-auto" />
								<p className="pl-5 relative">240-250 km/h</p>
							</div>

							<div className="flex ">
								<FaCarAlt className="w-7 h-auto" />
								<p className="pl-5 relative">4 seats</p>
							</div>
							<div className="flex ">
								<TbRosetteDiscountCheckFilled className="w-7 h-auto" />
								<p className="pl-5 relative">2 years</p>
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="h-full w-px"></div>
						<div className="justify-end items-center flex text-xl pl-12">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Harum doloribus provident esse natus omnis?
							Accusantium iusto nostrum quis. Blanditiis corrupti
							inventore culpa voluptas, laudantium minima
							architecto ipsum odio ex id! Lorem ipsum dolor sit
							amet, consectetur adipisicing elit. Harum doloribus
							provident esse natus omnis? Accusantium iusto
							nostrum quis. Blanditiis corrupti inventore culpa
							voluptas, laudantium minima architecto ipsum odio ex
							id! Lorem ipsum dolor sit amet, consectetur
							adipisicing elit. Harum doloribus provident esse
							natus omnis? Accusantium iusto nostrum quis.
							Blanditiis corrupti inventore culpa voluptas,
							laudantium minima architecto ipsum odio ex id! Lorem
							ipsum dolor sit amet, consectetur adipisicing elit.
							Harum doloribus provident esse natus omnis?
							Accusantium iusto nostrum quis. Blanditiis corrupti
							inventore culpa voluptas, laudantium minima
							architecto ipsum odio ex id!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OverView;
