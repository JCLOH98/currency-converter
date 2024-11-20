
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


const Button = ({icon,title,goto,animation=false}) => {
    library.add(fab, fas, far);
    return (
        <button type="button" onClick={goto} title={title} className="border-none w-10 h-10 flex items-center justify-center rounded-full bg-slate-50">
            <FontAwesomeIcon className={`${animation?"animate-spin":""}`} icon={icon} />
        </button>
    )
}

export default Button;