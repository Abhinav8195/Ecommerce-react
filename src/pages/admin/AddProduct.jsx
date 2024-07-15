import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from "../../firebase";

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' },
    { name: 'Camera' },
    { name: 'T.V' },
    { name: 'microwave' },
    { name: 'pressercooker' },
    { name: 'fryingpan' },
    { name: 'Knife-Set' },
    { name: 'Juicer' },
    { name: 'accesser' },
    { name: 'Knife-Set' },
];

const sectionList = [
    { name: 'Electronic' },
    { name: 'Clothing' },
    { name: 'Kitchen' },
    { name: 'Daily Needs' }
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [colors, setColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [customSize, setCustomSize] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [section, setSection] = useState('');
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [highlighted,setHighlightedReason]= useState([])

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSizeChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedSizes(selectedOptions);
    };

    const handleCustomSizeChange = (e) => {
        setCustomSize(e.target.value);
    };

    const addCustomSize = () => {
        if (customSize && !selectedSizes.includes(customSize)) {
            setSelectedSizes([...selectedSizes, customSize]);
            setCustomSize('');
        }
    };

    const handleUpload = async () => {
        if (image) {
            const storageRef = ref(storage, `products/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        saveProduct(downloadURL);
                    });
                }
            );
        } else if (imageUrl) {
            saveProduct(imageUrl);
        } else {
            alert("Please provide an image URL or upload an image file.");
        }
    };

    const saveProduct = async (downloadURL) => {
        try {
            const timestamp = new Date();
            await addDoc(collection(db, "products"), {
                title,
                colors,
                sizes: selectedSizes,
                price,
                imageUrl: downloadURL,
                category,
                section,
                description,
                createdAt: timestamp,
                highlighted
            });
            alert("Product added successfully!");
            console.log()
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpload();
    };

    return (
        <div>
            <div className='flex justify-center items-center '>
                <div className="login_Form bg-green-50 px-8 py-6 border border-green-100 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-green-500 '>Add Product</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="title"
                                placeholder='Product Title'
                                className='bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                placeholder='Product Price'
                                className='bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder='Product Image URL'
                                className='bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="file"
                                className='bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="color"
                                placeholder='Colors (comma separated)'
                                className='bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                value={colors.join(', ')}
                                onChange={(e) => setColors(e.target.value.split(',').map(color => color.trim()))}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                multiple
                                name="sizes"
                                className='bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                value={selectedSizes}
                                onChange={handleSizeChange}
                                
                            >
                                {sizeOptions.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder='Custom Size'
                                className='mt-2 bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                value={customSize}
                                onChange={handleCustomSizeChange}
                            />
                            <button
                                type="button"
                                onClick={addCustomSize}
                                className='mt-2 bg-green-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md'
                            >
                                Add Custom Size
                            </button>
                        </div>
                        <div className="mb-3">
                            <select
                                className="w-full px-1 py-2 text-black bg-green-50 border border-green-200 rounded-md outline-none"
                                value={section}
                                onChange={(e) => setSection(e.target.value)}
                                required
                            >
                                <option disabled value=''>Select Product Section</option>
                                {sectionList.map((value, index) => (
                                    <option className="first-letter:uppercase" key={index} value={value.name}>{value.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select
                                className="w-full px-1 py-2 text-black bg-green-50 border border-green-200 rounded-md outline-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                
                            >
                                <option disabled value=''>Select Product Category</option>
                                {categoryList.map((value, index) => (
                                    <option className="first-letter:uppercase" key={index} value={value.name}>{value.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <textarea
                                name="description"
                                placeholder="Product Description"
                                rows="5"
                                className="w-full px-2 py-1 text-black bg-green-50 border border-green-200 rounded-md outline-none placeholder-black"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="highlightReason" className="block mb-1">Highlight Reasons:</label>
                            <input
                                type="text"
                                id="highlightReason"
                                className='bg-green-50 text-black border border-green-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black'
                                value={highlighted.join(', ')} // Join reasons with commas for display
                                onChange={(e) => setHighlightedReason(e.target.value.split(',').map(reason => reason.trim()))} // Split by commas and trim
                                placeholder="Enter reasons for highlighting, separated by commas"
                            />
                        </div>


                        <div className="mb-3">
                            <progress value={uploadProgress} max="100" />
                        </div>
                        <div className="mb-3">
                            <button
                                type='submit'
                                className='bg-green-500 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md'
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
               

                </div>
            </div>
        </div>
    );
}

export default AddProduct;
