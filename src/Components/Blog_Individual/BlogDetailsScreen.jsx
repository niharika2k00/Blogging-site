

import React, { useEffect } from 'react';
import LOAD from '../Loading.js';
import {
    FacebookShareButton,
    FacebookIcon,

    WhatsappShareButton,
    WhatsappIcon,

    LinkedinShareButton,
    LinkedinIcon
} from "react-share";
import { useLocation } from 'react-router-dom';
import '../../STYLES/individualBlog.css';





const BlogDetailsScreen = ({ FetchBlogs, setAllBlogs, allBlogs, USER, loading, setLoading }) => {


    const location = useLocation();

    const modify_url = location.pathname;
    const url_postId = modify_url.substring(modify_url.lastIndexOf('/') + 1)

    var width = window.innerWidth;
    const URL = window.location.href;     // full url of the site

    useEffect(() => {
        if (Object.keys(USER).length !== 0) {
            setLoading(true);
            FetchBlogs();
            console.log(allBlogs);            // array of Object
            // setLoading(false);
        }
    }, [USER]);


    // const someHtml = '<h4>Maze Runner</h4><p><img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=755&amp;q=80" alt=""></p><p><em><strong>Hellooo strawberry</strong></em></p><p><em>An ID should be unique within a page. However, if more than one element with the <strong>specified ID</strong> exists, the getElementById() method returns the first element in the source code.</em></p><p><img src="https://images.unsplash.com/photo-1452827073306-6e6e661baf57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=667&amp;q=80" alt=""></p>'








    return (
        <div className="blogContainer">

            {loading ? <LOAD /> :
                allBlogs.length !== 0 ?
                    (
                        <div>
                            {  /* array.map ---- then we get individual object */
                                allBlogs.map(item => (
                                    url_postId === item.id ?
                                        (
                                            <div style={{ width: "100%", height: "100%", }} >
                                                <div >
                                                    <img src={item.coverImg} className="coverImg" alt="COVER IMAGE" width="100%" />
                                                </div>
                                                <h1 className="BlogHead">  {item.title}  </h1>
                                                <p className="BlogAuthor"> - By {item.author} | <span> {item.Created_At} </span>   </p>

                                                <div className="share_btn" >
                                                    <FacebookShareButton className="btn btn-primary btn-floating m-1 btn-lg icon-facebook" url={URL} title="TPP" source="" >
                                                        < FacebookIcon size={38} round={true} />
                                                    </FacebookShareButton>

                                                    <LinkedinShareButton className="btn btn-primary btn-floating m-1 btn-lg icon-linkedin" url={URL} title="TPP" source="" >
                                                        < LinkedinIcon size={38} round={true} />
                                                    </LinkedinShareButton>

                                                    < WhatsappShareButton url={URL} title="Go and Check Out Our Post... " separator=" " className="btn btn-primary btn-floating m-1 btn-lg icon-whatsapp" >
                                                        <WhatsappIcon size={38} round={true} />
                                                    </WhatsappShareButton>
                                                </div>

                                                <hr></hr>
                                                {/* <iframe srcDoc={item.body} width="100%" height="100%"></iframe> */}
                                                <div className="BlogBody" dangerouslySetInnerHTML={{ __html: item.body }}></div>
                                            </div>

                                        ) : []
                                ))
                            }
                        </div>
                    ) : []
            }
        </div>
    )
}

export default BlogDetailsScreen;
