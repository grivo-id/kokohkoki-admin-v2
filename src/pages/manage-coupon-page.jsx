import { useCallback, useEffect, useState } from "react";
import ContentWrapper from "../components/UI/content-wrapper";
import { useAuth } from "../context/use-context";
import { getAllCoupons } from "../api/coupon-api";
import CouponItem from "../components/coupon/coupon-item";
import AddCoupon from "../components/coupon/add-coupon-modal";

export default function ManageCouponPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userToken } = useAuth();
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCoupons(userToken);
      setCoupons(data.data.reverse());
    } catch (error) {
      if(error.message === 'Request failed with status code 404') {
        setCoupons([])
      }
      console.error("Failed to fetch coupon:", error);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const reFetchCoupon = () => {
    fetchCoupons();
  };

  return (
    <>
      <section id="coupon-section" className="section-wrapper">
        <h1 className="text-rose-500 text-2xl font-bold mb-5">Manage Coupons</h1>
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button className="bg-rose-500 text-white px-3 py-2.5 rounded-md" onClick={() => setIsOpen(true)}>
            Add Coupon
          </button>
        </div>
        <ContentWrapper loading={loading}>
          {coupons.map((coupon) => (
            <CouponItem key={coupon.id} {...coupon} reFetchCoupon={reFetchCoupon} />
          ))}
        </ContentWrapper>
      </section>
      <AddCoupon isOpen={isOpen} setIsOpen={setIsOpen} onAdd={reFetchCoupon} />
    </>
  );
}
