import React from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import LoadRecitalForm from "components/form/LoadRecitalForm.js";


class RecitalAddPage extends React.Component {


    render() {
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
                <div className="offset-2 col-8">
                    <LoadRecitalForm />
                </div>
                </>
        );
    }
}

export default RecitalAddPage;