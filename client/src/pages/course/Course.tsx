//import video from "../assets/Media.mp4";
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../auth/Profile'
import Module from './Module'
import type ModuleType from '../types'
import Loading from '../auth/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const ModuleData: ModuleType[] =[]
const Course = () => {
    const { id } = useParams()
    const [moduleData, setModuleData] = useState<ModuleType[]>(ModuleData)
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

        void fetch('http://localhost:4000/modules/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setModuleData(result)
            })
    }, [])
    return (
        <>{(id==undefined)?<><Loading/></>:<>
            <Module data={moduleData} />
            <div>{Profile}</div></>
        }
        </>
    )
}
export default withAuthenticationRequired(Course, {
    onRedirecting: () => <Loading />,
});