import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminSidebar from './components/sidebars/AdminSidebar';
import SessionContext from './contexts/SessionContext';
import Dashboard from './pages/Dashboard';
import AdminStudentTable from './components/tables/admin/AdminStudentTable';
import AdminCounsellorTable from './components/tables/admin/AdminCounsellorTable';
import AdminParentTable from './components/tables/admin/AdminParentTable';
import CounsellorSidebar from './components/sidebars/CounsellorSidebar';
import CounsellorStudentTable from './components/tables/counsellor/CounsellorStudentTable';
import StudentSidebar from './components/sidebars/StudentSidebar';
import YourCounsellor from './components/tables/students/YourCounsellor';
import Yourparent from './components/tables/students/Yourparent';
import YourStudent from './components/tables/parent/YourStudent';
import ParentSidebar from './components/sidebars/ParentSidebar';
import AddParent from './components/tables/students/AddParent';
import { FeeReceipt } from './components/tables/students/FeeReceipt';
import { AcademicDetails } from './components/tables/students/AcademicDetails';
import ViewFeedback from './components/tables/counsellor/ViewFeedback';
import GiveFeedback from './components/tables/counsellor/GiveFeedback';
import GiveStudentFeedback from './components/tables/students/GiveFeedback';
import ViewStudentFeedback from './components/tables/students/ViewFeedback';
import Report from './components/report/Report';
import Assessment from './components/report/Asessment';
import Record from './components/studyabroad/Record';
import Score from './components/studyabroad/Score';
import GenerateReceipt from './components/tables/counsellor/GenerateReceipt';
import StudentRecordTable from './components/studyabroad/StudentRecordTable';
import StudentDocumentTable from './components/studyabroad/StudentDocumentTable';
import Document from './components/studyabroad/Document';

function Layout() {
    const { user } = useContext(SessionContext);

    return (
        <>
            {user.role === 'admin' && (
                <>
                    <AdminSidebar />
                    <Routes>
                        <Route path='/' element={<AdminCounsellorTable />} />
                        <Route path='/students' element={<AdminStudentTable />} />
                        <Route path='/profile' element={<Dashboard />} />
                        <Route path='/parents' element={<AdminParentTable />} />
                    </Routes>
                </>
            )}

            {user.role === 'counsellor' && (
                <>
                    <CounsellorSidebar />
                    <Routes>
                        <Route path='/' element={<CounsellorStudentTable />} />
                        <Route path='/profile' element={<Dashboard />} />
                        <Route path='/viewfeedback' element={<ViewFeedback />} />
                        <Route path='/givefeedback' element={<GiveFeedback />} />
                        <Route path='/report/:id' element={<Report />} />
                        <Route path='/assessment/:id' element={<Assessment />} />
                        <Route path='/record/:id' element={<Record />} />
                        <Route path='/record' element={<StudentRecordTable />} />
                        <Route path='/document' element={<StudentDocumentTable />} />
                        <Route path='/document/:id' element={<Document />} />
                        <Route path='/generatereceipt' element={<GenerateReceipt />} />
                    </Routes>
                </>
            )}

            {user.role === 'student' && (
                <>
                    <StudentSidebar />
                    <Routes>
                        <Route path='/profile' element={<Dashboard />} />
                        <Route path='/' element={<YourCounsellor />} />
                        <Route path='/parent' element={<Yourparent />} />
                        <Route path='/addparent' element={<AddParent />} />
                        <Route path='/fees' element={<FeeReceipt />} />
                        <Route path='/faq' element={<></>} />
                        <Route path='/contact' element={<></>} />
                        <Route path='/academic' element={<AcademicDetails />} />
                        <Route path='/non_academic' element={<></>} />
                        <Route path='/givefeedback' element={<GiveStudentFeedback />} />
                        <Route path='/viewfeedback' element={<ViewStudentFeedback />} />
                        <Route path='/report/:id' element={<Report />} />
                        <Route path='/record/:id' element={<Record />} />
                        <Route path='/score/:id' element={<Score />} />
                        <Route path='/document/:id' element={<Document />} />
                    </Routes>
                </>
            )}

            {user.role === 'parent' && (
                <>
                    <ParentSidebar />
                    <Routes>
                        <Route path='/profile' element={<Dashboard />} />
                        <Route path='/' element={<YourStudent />} />
                        <Route path='/report/:id' element={<Report />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default Layout;
