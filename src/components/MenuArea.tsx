import MenuItem from "./MenuItem";
import { SelectScrollableColorMap } from "./ScrollableColorMap";
import { SelectFileType } from "./SelectFileType";


export default function MenuArea() {
    return (
        <div className='bg-white flex-1 my-20 ml-10 rounded-lg min-w-[300px] flex justify-center shadow-xl flex-col gap-5 items-center'>
            <MenuItem name="Color Map">
                <SelectScrollableColorMap />
            </MenuItem>
            <MenuItem name="File Type">
                <SelectFileType />
            </MenuItem>
        </div>
    )
}
