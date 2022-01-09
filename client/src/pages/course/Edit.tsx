import { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
const Edit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleEditModules=()=>{
        //
        navigate(`/module/${id}`)
    }
    const handleEdit = () => {
        //
        const titleValue = (document.getElementById('module-title') as HTMLInputElement).value
        const shortValue = (document.getElementById('video-short') as HTMLInputElement).value
        const imageVale = (document.getElementById('image-link') as HTMLInputElement).value
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({
            id: id,
            title: titleValue,
            shortDescription: shortValue,
            image: imageVale,
        })

        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('http://localhost:4000/api/course/', requestOptions)
            .then((response) => response.json())
            // .then((result) => {
            //     console.log(result)
            //     //navigate('/courses')
            // })
            // .catch((error) => console.log('error', error))
    }
    useEffect(() => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({
            id: id,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('http://localhost:4000/api/course/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const t = document.getElementById('module-title') as HTMLInputElement
                const short = document.getElementById('video-short') as HTMLInputElement
                const image = document.getElementById('image-link') as HTMLInputElement
                const imageDisp=document.getElementById("image-source") as HTMLImageElement
                t!.value = result[0].title
                short!.value = result[0].shortDescription
                image!.value = result[0].imageUrl
                imageDisp!.src=result[0].imageUrl
            })
            // .catch((error) => console.log('error', error))
    }, [])
    return (
        <>
            <div>
                <Alert variant="secondary">
                    <Alert.Heading>
                        <h1>
                            <b>Edit a course</b>
                        </h1>
                    </Alert.Heading>
                </Alert>
                <button onClick={handleEditModules} className="btn btn-success">
                    Edit modules
                </button>
                <h4>Course Title</h4>
                <div className="mb-3">
                    <label className="form-label">Enter a course title.</label>
                    <input id="module-title" className="form-control" type="text" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Language. (default: English)</label>
                    <input id="language" className="form-control" type="text" value="en" readOnly />
                </div>
                <h2>Short Description</h2>
                <p>Use this area to give a short description of the new module. </p>
                <div className="form-floating textarea mb-3">
                    <textarea className="form-control" maxLength={500} id="video-short"></textarea>
                    <label>
                        Short description{' '}
                        <span style={{ color: 'red' }}>(max: 500 characters)</span>
                    </label>
                </div>
                <h4>Long description</h4>
                <p>
                    Use this area to give a long description of the new module. Take note that HTML
                    format is supported.
                </p>
                <img
                    alt=""
                    className="rounded mx-auto d-block im"
                    id="image-source"
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
                <div className="mb-3">
                    <label className="form-label">Enter a new link below if you wish to change the image above</label>
                    <input id="image-link" className="form-control" type="text" />
                </div>
                <button onClick={handleEdit} className="btn btn-success">
                    Save edits
                </button>
            </div>
        </>
    )
}

export default Edit