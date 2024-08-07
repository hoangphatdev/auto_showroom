import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
	onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center">
			<div className="w-full flex items-center space-x-3">
				<input
					type="text"
					className="w-full px-4 py-2 text-gray-900 bg-white border rounded-xl cbg-gray-50"
					placeholder="Search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div>
					<FaSearch className="w-5 h-5" />
				</div>
			</div>
		</form>
	);
};

export default SearchBar;
