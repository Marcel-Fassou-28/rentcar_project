import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../../../config/Axios";
import { useEffect } from "react";

const DeleteCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const response = instance.delete(`/admin/voitures/delete/${id}`);
      navigate("/admin/voitures");
    } catch (err) {
      console.log(err);
    }
  }, []);


  return <div className="text-center py-16 text-2xl font-bold text-orange-500">chargement...</div>;
};

export default DeleteCar;
