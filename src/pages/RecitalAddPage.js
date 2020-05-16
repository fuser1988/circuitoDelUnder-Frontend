import React from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import LoadRecitalForm from "components/form/LoadRecitalForm.js";
import { Card } from "reactstrap";

class RecitalAddPage extends React.Component {


    render() {
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
                <Card className="offset-2 col-10 responsive-card">
                    <LoadRecitalForm />
                </Card>
                </>
        );
    }
}

export default RecitalAddPage;