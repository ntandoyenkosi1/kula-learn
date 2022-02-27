import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../auth/Profile'
import { ModuleType } from '../types'
import Loading from '../auth/Loading'
import ModuleView from '../module/ViewModule'
import { getCookie } from '../helpers'

const ModuleData: ModuleType[] = []
const Course = () => {
    const { id } = useParams()
    const [moduleData, setModuleData] = useState<ModuleType[]>(ModuleData)
    useEffect(() => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('x-auth-token', getCookie('token'))
        const raw = JSON.stringify({
            id: id,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        void fetch('https://kula-learn-server.herokuapp.com/modules/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setModuleData(result)
            })
    }, [])
    return (
        <>
            {id == undefined ? (
                <>
                    <Loading />
                </>
            ) : (
                <>
                    <ModuleView data={moduleData} />
                    <div>{Profile}</div>
                </>
            )}
        </>
    )
}
export default Course
