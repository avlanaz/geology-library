import {NextResponse} from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(req, {params}) {
    const {slag} = params;
    console.log(slag);

    try {
        //Find the absolute path of the json directory
        const dataDirectory = path.join(process.cwd(), 'public/data');
        //Read the json data file data.json
        const fileContents = await fs.readFile(dataDirectory + '/' + slag, 'utf8');
        //Return the content of the data file in json format
        return new NextResponse(fileContents, { status: 200 })
    } catch (err) {
        console.log(err)
        return new NextResponse(err, { status: 404 })
    }
}