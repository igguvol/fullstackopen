import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

jest.mock('./services/blogs')
jest.mock('./services/login')

configure({ adapter: new Adapter() })