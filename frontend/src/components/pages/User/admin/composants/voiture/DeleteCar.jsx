import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../../../config/Axios";
import { useEffect } from "react";

const DeleteCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const response = instance.delete(`/admin/voitures/delete/${id}`);
      setLoading(false);
      navigate("/admin/voitures");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);


  if (loading) return <div className="text-center"><div className="pt-16 flex flex-col md:flex-row bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <main className="flex-1 p-6 md:p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </main>
      </div></div>;
};

export default DeleteCar;
