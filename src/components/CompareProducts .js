import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Image, Modal } from "antd";
import {
  addToCompare,
  removeFromCompare,
  toggleModal,
} from "../redux/compareSlice";
import AddMoreModal from "./AddMoreModal";

const CompareProducts = () => {
  const dispatch = useDispatch();
  const comparedProducts = useSelector(
    (state) => state.compare.comparedProducts
  );
  const [allProducts, setAllProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products));
  }, []);

  // Attributes for comparison
  const attributes = [
    { key: "title", label: <strong>Title</strong> },
    {
      key: "brand",
      label: <strong>Brand</strong>,
      render: (text, record) => <>{!text ? "NA" : text}</>,
    },
    { key: "category", label: <strong>Category</strong> },
    { key: "price", label: <strong>Price ($)</strong> },
    { key: "discountPercentage", label: <strong>Discount (%)</strong> },
    { key: "thumbnail", label: <strong>Image</strong> },
    { key: "remove", label: <strong>Remove</strong> },
  ];

  // Prepare table data where each row is an attribute
  const tableData = attributes.map((attr) => {
    const row = { key: attr.key, attribute: attr.label };

    comparedProducts.forEach((product) => {
      if (attr.key === "thumbnail") {
        row[product.id] = (
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "50px" }}
          />
        );
      } else if (attr.key === "remove") {
        row[product.id] = (
          <Button
            danger
            onClick={() => dispatch(removeFromCompare(product.id))}
          >
            Remove
          </Button>
        );
      } else {
        row[product.id] = !product[attr.key] ? "NA" : product[attr.key];
      }
    });

    return row;
  });

  // Table columns: First column is "Attributes", rest are dynamic product columns
  const columns = [
    {
      title: "Attributes",
      dataIndex: "attribute",
      key: "attribute",
      fixed: "left",
      width: 150,
    },
    ...comparedProducts.map((product) => ({
      title: product.title,
      dataIndex: product.id,
      key: product.id,
      align: "center",
    })),
  ];

  // Modal Table Columns
  const modalColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text, record) => <>{!text ? "NA" : text}</>,
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => dispatch(addToCompare(record))}
          disabled={
            comparedProducts.some((p) => p.id === record.id) ||
            comparedProducts.length >= 4
          }
          style={{
            background:
              "linear-gradient(96.71deg, #04dfb8 4.74%, #4198ff 101.31%)",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
            opacity: comparedProducts.some((p) => p.id === record.id) ? 0.6 : 1, // Dim when disabled
          }}
        >
          {comparedProducts.some((p) => p.id === record.id) ? "Added" : "Add"}
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.content}>
        <h2>{columns.length < 2 ? "No Product Added" : "Compare Products"}</h2>
        {columns.length < 2 ? null : (
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            bordered
          />
        )}

        <Button
          onClick={() => setIsModalOpen(true)}
          style={{
            marginTop: 16,
            background:
              "linear-gradient(96.71deg, #04dfb8 4.74%, #4198ff 101.31%)",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
            opacity: columns.length === 5 ? 0.6 : 1, // Dim if disabled
          }}
          disabled={columns.length === 5}
        >
          {columns.length < 2 ? "Add a product" : "Add more"}
        </Button>

        {/* Modal for Adding More Products */}
        <Modal
          title="Add More Products"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Table
            dataSource={allProducts}
            columns={modalColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Modal>
      </div>
    </div>
  );
};
const styles = {
  pageWrapper: {
    display: "flex",
    minHeight: "100vh", 
    paddingLeft: "250px",
    paddingTop: "80px", 
  },
  content: {
    padding: "20px",
    width: "100%",
  },
};

export default CompareProducts;
