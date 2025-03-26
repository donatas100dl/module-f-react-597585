import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [bookLoading, setBookLoading] = useState(true);
    const [token, setToken] = useState(Cookies.get("token"))
    const [books, setBooks] = useState();

    async function CreateBook(book) {
        try {
            const response = await axios.post("http://localhost:4001/library/", JSON.stringify(book), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })

            if (response.status === 200) {
                console.log("Successfully created book", response)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const UpdateBook = async (bookId, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:4001/library/${bookId}`, JSON.stringify(updatedData), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                console.log("Successfully updated book", response);
            }
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const DeleteBook = async (bookId) => {
        try {
            const response = await axios.delete(`http://localhost:4001/library/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                console.log("Successfully deleted book", response);
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const GetBooks = async () => {
        setBookLoading(true);
        try {
            const response = await axios.get("http://localhost:4001/library/", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                console.log("Successfully got all books", response);
                setBooks(response.data); // Update this line to properly set the array
            }
        } catch (error) {
            console.log(error);
        } finally {
            setBookLoading(false);
        }
    };

    const contextData = useMemo(() => ({
        CreateBook,
        UpdateBook,
        DeleteBook,
        GetBooks,
        books,
        bookLoading
    }), [books, bookLoading]);


    return (
        <BookContext.Provider value={contextData}>
            {children}
        </BookContext.Provider>
    );
};

export const useBook = () => {
    return useContext(BookContext);
};

export default BookContext;