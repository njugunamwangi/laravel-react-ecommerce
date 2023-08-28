import {useStateContext} from "./contexts/ContextProvider.jsx";
import {Fragment, useEffect, useRef, useState} from "react";
import axiosClient from "../axios.js";
import { Transition, Dialog } from '@headlessui/react'
import Loading from "./components/core/Loading.jsx";
import {useNavigate} from "react-router-dom";
import AdminComponent from "./components/AdminComponent.jsx";
import TButton from "./components/core/TButton.jsx";
import {PlusIcon, SquaresPlusIcon} from "@heroicons/react/20/solid/index.js";
import CategoryItem from "./itemList/CategoryItem.jsx";

export default function Categories() {
    const { showToast } = useStateContext()

    const [ categories, setCategories ] = useState([])

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/category')
            .then(({ data }) => {
                setCategories(data.data)
                setLoading(false)
            })
    }, [])

    const [category, setCategory] = useState({
        category: "",
        slug: ""
    })

    const [ error, setError ] = useState("")

    const navigate = useNavigate()

    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)

    const openAddCategoryModal = () => {
        setIsAddCategoryModalOpen(true);
    };

    const closeAddCategoryModal = () => {
        setIsAddCategoryModalOpen(false);
    };

    const onDeleteClick = () => {
        console.log('Deleted');
    };

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = { ...category }

        axiosClient.post('/category', payload)
            .then(() => {
                navigate('/categories')
                setLoading(true)
                axiosClient.get('/category')
                    .then(({ data }) => {
                        setCategories(data.data)
                        setLoading(false)
                    })
                setIsAddCategoryModalOpen(false);
                showToast('Category created successfully')
            })
            .catch((err) => {
                if (err && err.response) {
                    setError(err.response.data.errors)
                }
            })
    }

    const cancelButtonRef = useRef(null)

    return (
        <>
            <div>
                {
                    loading && (
                        <Loading />
                    )
                }
            </div>
            <div>
                {
                    !loading && (
                        <div>
                            <AdminComponent
                                title="Categories"
                                buttons={(
                                    <>
                                        <TButton
                                            onClick={openAddCategoryModal}
                                            color="green"
                                        >
                                            <PlusIcon className="w-6 h-6 mr-2" />
                                            Add Category
                                        </TButton>

                                        <Transition.Root show={isAddCategoryModalOpen} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="relative z-10"
                                                initialFocus={cancelButtonRef}
                                                onClose={closeAddCategoryModal}>

                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                </Transition.Child>

                                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                        >
                                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                <form method="POST" onSubmit={onSubmit} >
                                                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                        <div className="sm:flex sm:items-start">
                                                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                                <SquaresPlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                                                            </div>
                                                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                                    Add Category
                                                                                </Dialog.Title>
                                                                                <div className="mt-2">
                                                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                                        <input
                                                                                            type="text"
                                                                                            name="category"
                                                                                            id="category"
                                                                                            value={category.category}
                                                                                            onChange={(ev) =>
                                                                                                setCategory({...category, category: ev.target.value})
                                                                                            }
                                                                                            className="block w-[400px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                                                                                            placeholder="Category"
                                                                                        />
                                                                                    </div>
                                                                                    {error.category && (<small className="text-sm text-red-500">
                                                                                        {error.category}
                                                                                    </small>)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                        <TButton color="green">
                                                                            Save
                                                                        </TButton>
                                                                        <button
                                                                            type="button"
                                                                            className="mt-3 mr-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                            onClick={() => setIsAddCategoryModalOpen(false)}
                                                                            ref={cancelButtonRef}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </Dialog.Panel>
                                                        </Transition.Child>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </Transition.Root>

                                    </>
                                )}
                            >
                                {
                                    categories == 0 && (
                                        <p>
                                            You have not created any categories yet
                                        </p>
                                    )
                                }
                                <ul role="list" className="divide-y divide-gray-100">
                                    {categories.map((category) => (
                                        <CategoryItem category={category} key={category.id} onDeleteClick={onDeleteClick} />
                                    ))}
                                </ul>
                            </AdminComponent>
                        </div>
                    )
                }
            </div>
        </>
    )
}
