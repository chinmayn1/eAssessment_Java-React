// Unprotected Components
import SignIn from "../pages/Signin"
import SignUp from "../pages/Signup"
import Passwd from "../pages/Passwd"
import ResetPasswd from "../pages/ResetPasswd";
import Details from "../pages/Details";
// Protected Components
import Dash from '../pages/user/index';
import Profile from "../pages/user/Profile";
import Company from "../pages/user/Company";
import Team from "../pages/user/Teams"
import Billing from "../pages/user/Billing";
import NewAssessment from "../pages/user/NewAssessment";
import AddQuestion from "../pages/user/AddQuestion";
import ReviewConfig from "../pages/user/ReviewConfig";
import MultipleChoiceQue from "../pages/QuestionTypes/MultipleChoiceQuestion"
import VideoRecordQue from "../pages/QuestionTypes/VideoRecordQuestion"
import FileUploadQue from "../pages/QuestionTypes/FileUploadQuestion"
import CodingQue from "../pages/QuestionTypes/CodingQuestion"
import EssayQue from "../pages/QuestionTypes/EssayQuestion"
import AssessmentInvitation from "../pages/user/AssessmentInvitation";
// Not found 404 error
import NotFound from '../error/404'


//! hasAccess will be for role based url accessible for owner and admin if true anyone can access the resource else only owner and admin can 
export default [
	{
		path: "/",
		componentName: SignIn,
		exact: true,
		isProtected: false,
		hasAccess: true
	},
	{
		path: "/signup",
		componentName: SignUp,
		exact: true,
		isProtected: false,
		hasAccess: true
	},
	{
		path: "/set-password",
		componentName: Passwd,
		exact: true,
		isProtected: false,
		hasAccess: true
	},
	{
		path: "/reset-password",
		componentName: ResetPasswd,
		exact: true,
		isProtected: false,
		hasAccess: true
	},
	{
		path: "/details",
		componentName: Details,
		exact: true,
		isProtected: false,
		hasAccess: true
	},
	{
		path: "/dashboard",
		componentName: Dash,
		exact: true,
		isProtected: false,
		hasAccess: true
	},
	{
		path: "/new-assessment/",
		componentName: NewAssessment,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "/add-questions/",
		componentName: AddQuestion,
		exact: true,
		// isProtected: true,
		// hasAccess: false
	},
	{
		path: "/review-config/",
		componentName: ReviewConfig,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "/add-questions/multiple-choice",
		componentName: MultipleChoiceQue,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "/add-questions/video-record",
		componentName: VideoRecordQue,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "/add-questions/file-upload",
		componentName: FileUploadQue,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "/add-questions/coding",
		componentName: CodingQue,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "/add-questions/essay",
		componentName: EssayQue,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "/assessment/edit/:name",
		componentName: AssessmentInvitation,
		exact: true,
		isProtected: true,
		hasAccess: true
	},
	{
		path: "/profile",
		componentName: Profile,
		exact: true,
		isProtected: true,
		hasAccess: true
	},
	{
		path: "/company",
		componentName: Company,
		exact: true,
		isProtected: true,
		hasAccess: true
	},
	{
		path: "/billing",
		componentName: Billing,
		exact: true,
		isProtected: true,
		hasAccess: true
	},
	{
		path: "/teams",
		componentName: Team,
		exact: true,
		isProtected: true,
		hasAccess: false
	},
	{
		path: "*",
		componentName: NotFound,
		exact: true,
		isProtected: false,
	}
]