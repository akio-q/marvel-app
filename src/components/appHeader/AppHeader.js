import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <div className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className='app__menu'>
                <ul>
                    <li><NavLink 
                        end 
                        style={({isActive}) => ({color: isActive ? '#9f0013' : null})}
                        to="/">Characters</NavLink></li>
                    /
                    <li><NavLink 
                        end 
                        style={({isActive}) => ({color: isActive ? '#9f0013' : null})}
                        to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default AppHeader;