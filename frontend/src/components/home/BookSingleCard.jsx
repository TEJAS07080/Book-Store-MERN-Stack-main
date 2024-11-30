import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-6 m-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <PiBookOpenTextLight className="text-red-500 text-2xl" />
            <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <BiUserCircle className="text-red-500 text-2xl" />
            <h3 className="text-md text-gray-600">{book.author}</h3>
          </div>
        </div>
        <span className="px-3 py-1 bg-red-200 text-red-700 text-sm rounded-md font-medium">
          {book.publishYear}
        </span>
      </div>
      <div className="flex justify-between items-center gap-4 mt-6">
        <BiShow
          className="text-3xl text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`} className="hover:text-green-700">
          <BsInfoCircle className="text-2xl text-green-500" />
        </Link>
        <Link to={`/books/edit/${book._id}`} className="hover:text-yellow-700">
          <AiOutlineEdit className="text-2xl text-yellow-500" />
        </Link>
        <Link to={`/books/delete/${book._id}`} className="hover:text-red-700">
          <MdOutlineDelete className="text-2xl text-red-500" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
