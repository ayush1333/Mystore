import { useSelector, useDispatch } from "react-redux";
import { addToCompare } from "../redux/compareSlice";
import { Table, Button } from "antd";

const AddMoreProductsModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const comparedProducts = useSelector((state) => state.compare.comparedProducts);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Brand", dataIndex: "brand", key: "brand",  render: (text, record) => (
        <>
          {!text ? "NA" : text}
        </>
      ), },
    {
      title: "Compare",
      key: "compare",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => dispatch(addToCompare(record))}
          disabled={comparedProducts.some((p) => p.id === record.id) || comparedProducts.length >= 4}
          
        >
          {comparedProducts.some((p) => p.id === record.id) ? "Added" : "Add to Compare"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={products} columns={columns} rowKey="id" />
      <Button onClick={closeModal} style={{ marginTop: 10 }}>
        Close
      </Button>
    </div>
  );
};

export default AddMoreProductsModal;
