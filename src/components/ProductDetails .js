import React, { useEffect, useState } from "react";
import { Table, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCompare } from "../redux/compareSlice";
import { getHighlightedAttributes } from "../utils/compareUtils";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const comparedProducts =
    useSelector((state) => state.compare.comparedProducts) || [];
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  // Get highlighted attributes
  const highlightedAttributes = getHighlightedAttributes(comparedProducts);

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (src) => <Image width={50} src={src} alt="Product" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <span
          style={
            comparedProducts.some((p) => p.id === record.id) &&
            highlightedAttributes["title"]
              ? { backgroundColor: "#ffeb3b" }
              : {}
          }
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text, record) => (
        <span
          style={
            comparedProducts.some((p) => p.id === record.id) &&
            highlightedAttributes["price"]
              ? { backgroundColor: "#ffeb3b" }
              : {}
          }
        >
          ${text}
        </span>
      ),
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => (
        <span
          style={
            comparedProducts.some((p) => p.id === record.id) &&
            highlightedAttributes["price"]
              ? { backgroundColor: "#ffeb3b" }
              : {}
          }
        >
          ${text}
        </span>
      ),
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (text, record) => (
        <span
          style={
            comparedProducts.some((p) => p.id === record.id) &&
            highlightedAttributes["discountPercentage"]
              ? { backgroundColor: "#ffeb3b" }
              : {}
          }
        >
          {text}%
        </span>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => (a.brand || "").localeCompare(b.brand || ""),
      render: (text, record) => (
        <span
          style={
            comparedProducts.some((p) => p.id === record.id) &&
            highlightedAttributes["brand"]
              ? { backgroundColor: "#ffeb3b" }
              : {}
          }
        >
          {!text ? "NA" : text}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text, record) => (
        <span
          style={
            comparedProducts.some((p) => p.id === record.id) &&
            highlightedAttributes["category"]
              ? { backgroundColor: "#ffeb3b" }
              : {}
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Compare",
      key: "compare",
      render: (_, record) => (
        <Button
          onClick={() => dispatch(addToCompare(record))}
          disabled={comparedProducts.some((p) => p.id === record.id)}
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
          {comparedProducts.some((p) => p.id === record.id)
            ? "Added"
            : "Compare"}
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Product Details</h2>
        <div style={styles.tableWrapper}>
          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </div>
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
  container: {
    backgroundColor: "#697d9b",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    flexGrow: 1,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#fff",
    textAlign: "center",
    paddingBottom: "15px",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "10px",
  },
};

export default ProductDetails;
