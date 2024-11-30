import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left text-sm">
            <th className="px-4 py-3 border border-gray-300">No</th>
            <th className="px-4 py-3 border border-gray-300">Title</th>
            <th className="px-4 py-3 border border-gray-300 hidden md:table-cell">Author</th>
            <th className="px-4 py-3 border border-gray-300 hidden md:table-cell">Publish Year</th>
            <th className="px-4 py-3 border border-gray-300">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-gray-100 transition-colors">
              <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-300 text-center">{book.title}</td>
              <td className="px-4 py-2 border border-gray-300 text-center hidden md:table-cell">
                {book.author}
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center hidden md:table-cell">
                {book.publishYear}
              </td>
              <td className="px-4 py-2 border border-gray-300 text-center">
                <div className="flex justify-center gap-4">
                  <Link to={`/books/details/${book._id}`} className="text-green-600 hover:text-green-800">
                    <BsInfoCircle className="text-xl" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className="text-yellow-500 hover:text-yellow-700">
                    <AiOutlineEdit className="text-xl" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className="text-red-600 hover:text-red-800">
                    <MdOutlineDelete className="text-xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
