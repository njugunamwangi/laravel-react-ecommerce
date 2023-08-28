import TButton from "../components/core/TButton.jsx";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid/index.js";

export default function CategoryItem({category, onDeleteClick}) {
    return (
        <li key={category.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{category.category}</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-end">
                <TButton href={`/view/category/${category.slug}`} circle link>
                    <PencilSquareIcon className="w-5 h-5"/>
                </TButton>

                {category.id && (
                    <TButton onClick={onDeleteClick} circle link color="red">
                        <TrashIcon className="w-5 h-5"/>
                    </TButton>
                )}
            </div>
        </li>
    )
}
