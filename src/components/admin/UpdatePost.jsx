
import React, { useState, useEffect, useContext } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DataContext } from '../../contextAPI/DataProvider';
import { createPost, fileUpload, updatePost } from '../../services/apiCalls';
import NoImage from '../../assets/images/blogPost/fileUploading.jpg'
import { getAccessToken } from '../../utilMethods/commonMethods';


const UpdatePost = () => {

    const [BlogPost, setBlogPost] = useState({
        title: "",
        description: "",
        image: "",
        category: "",
        username: "",
        createdDate: new Date()

    });
    const [File, setFile] = useState('');
    const [searchParams] = useSearchParams();
    const { UserDetails } = useContext(DataContext);
    const [Image, setImage] = useState('');
    const [Error, setError] = useState({});
    const [Loader, setLoader] = useState(true);

    const{setAlertData}=useContext(DataContext);

    let navigate = useNavigate();
    let token = getAccessToken();
    const{id}=useSearchParams();
    let location= useLocation();
    let post= location.state?.post;
    // set initial value 
    useEffect(() => {
        setBlogPost(post)
        setImage(post.image)
        setLoader(false);
    }, [])


    useEffect(() => {
        let category = searchParams.get('category');
        const getImageFile = async () => {
            // here we check the file is present or not 
            if (File) {
                // if file presents so we have to append the file in formdata 
                let data = new FormData();
                data.append("name", File.name);
                data.append("file", File);
                //APi Call for image send data into this api as body 
                let fileData = await fileUpload('file/upload', data)
                console.log(fileData);
                setImage(fileData.imageURL);
                BlogPost.image = fileData.imageURL;
            }
        }
        getImageFile();
        BlogPost.category = category;
        BlogPost.username = UserDetails.name;
    }, [File]);

    const handleChange = (e) => {
        setBlogPost({ ...BlogPost, [e.target.name]: e.target.value });
    }

    const UpdateBlogPost = async () => {
        let goto = true;
        let error = {};
        if (BlogPost.title === "") {
            error['title'] = "Please write title of the blog";
            goto = false;
        }
        if (BlogPost.description === "") {
            error['description'] = "Please write description of the blog";
            goto = false;
        }
        if (BlogPost.image === "") {
            error['image'] = "Please upload image for the blog";
            goto = false;
        }
        setError(error);
        if (goto) {
            let response = await updatePost(`blogPostController/updatePost/${BlogPost._id}`, BlogPost, token, id);
            if (response?.statusCode === 200) {
                setAlertData({IsShow:true, Status: response.statusCode, Message:response.message})
                let Data=response.data;
                navigate(`/blogDetails/${Data._id}`);
            }else{
                setAlertData({IsShow:true, Status: response.statusCode, Message:response.message})
            }
        }
    }



    return (
        <div className='createPost'>
            { Loader ? <p>Loading...</p>
            :
            <div className="wrapper lg:py-28 md:py-28 py-24 lg:px-40 px-2 ">
                <div className="imageSection h-80    bg-origin-content p-4 border-4 border-dashed">
                    <img src={Image ? Image : NoImage} className='w-full  h-full' alt="" />
                </div>
                <span className='text-sm text-red-600'>{Error.image}</span>
                <div className=" actionSection flex  mt-4 ">
                    <div className="actionBody flex items-center space-x-2">

                        <label htmlFor='fileImage'>
                            <MdAddCircle className='text-3xl cursor-pointer text-gray-700' />
                            <input type="file" className='hidden' name="file" id="fileImage" onChange={(e) => setFile(e.target.files[0])} />

                        </label>
                        
                    </div>
                    <div className="input-field w-full">

                        <input type="text" name='title' value={BlogPost.title} placeholder='Enter your title' className='text-xl lg:w-[1025px] md:w-[350px] w-full  bottom-1 border-b-2 outline-none text-gray-700' onChange={handleChange} />
                        <span className='text-sm text-red-600'>{Error.title}</span>
                        </div>
                </div>
                <div className="description lg:pr-32 mt-4">
                    <textarea name="description" id="" cols="30" rows="10" placeholder='Enter your Message' className='border w-full p-4 outline-none text-gray-700' value={BlogPost.description} onChange={handleChange}></textarea>
                    <span className='text-sm text-red-600'>{Error.description}</span>
                </div>
                
                <div className='publish mt-2'>
                        <button className="inline-flex items-center cursor-pointer border-[#f53855] border-2 text-[#f53855] text-lg  hover:bg-[#f53855] hover:shadow-[0px_10px_40px_-10px_rgba(245,56,56,0.81)]  py-1 px-3 hover:text-white focus:outline-none  rounded   md:mt-0" onClick={UpdateBlogPost}>Update
                            <MdAddCircle className='mx-2 text-2xl' />
                        </button>


                    </div>
            </div>}
        </div>
    )
}

export default UpdatePost