import {v4 as uuidv4} from "uuid"

export const createUniqueId = () => {
    const myuuid = uuidv4()
    console.log(myuuid)
    return myuuid
}