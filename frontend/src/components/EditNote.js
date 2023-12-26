import React from 'react'


function EditNote(props) {

    const { reference, closeref, enote, onchange, handleChange } = props;


    return (
        <div>
        {/* Button trigger modal */}
            <button type="button" ref={reference} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal 
            </button>
            {/* <!-- Modal --> it is open when we click on above button */} 
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        {/* model header  */}
                        <div className="modal-header text-center">
                            <h5 className="modal-title " id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                         {/* model body */}
                        <div className="modal-body">
                            <div className='my-5'>

                                <div className="mb-3 ">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <select className="form-select" aria-label="Default select example" id="tag" value={enote.tag} onChange={onchange} name="tag">

                                        <option value="Todo">Todo</option>
                                        <option value="Important">Important</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={enote.title} onChange={onchange} name="title" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" name="description" value={enote.description} onChange={onchange} rows="3"></textarea>
                                </div>

                            </div>
                        </div>
                        {/* model header  */}
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleChange} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditNote