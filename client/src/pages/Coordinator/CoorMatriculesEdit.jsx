import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import FormStyle from "../../stylesheets/Form.module.css";
import TitleCardNavigation from "../../components/TitleCardNavigation";

function EditarProfesor() {
  const navigate = useNavigate();
  const { periodo_id, programa_id, id } = useParams();
}

export default EditarProfesor;
