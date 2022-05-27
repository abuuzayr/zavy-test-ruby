import React, { useEffect, useState } from "react";

type Customer = {
  name: string;
  date: string;
  number: number;
  description: string;
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const toggleSort = (by: string) => {
    if (by !== sortBy) {
      setOrder("asc");
      setSortBy(by);
    } else if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("");
      setSortBy("");
    }
  };

  useEffect(() => {
    async function getCustomers() {
      if (customers.length) return;
      const response = await fetch("/api/customers");
      const rows = await response.json();
      if (rows.length) {
        setCustomers(rows);
        setSortedCustomers(rows);
      }
    }
    getCustomers();
  }, []);

  useEffect(() => {
    let maybeSorted = [...customers];
    if (sortBy && order) {
      if (sortBy === "Number") {
        console.log("sorting by number...");
        maybeSorted = maybeSorted.sort((a: Customer, b: Customer) => {
          if (a.number === b.number) return 0;
          if (order === "asc") {
            return a.number < b.number ? -1 : 1;
          } else {
            return a.number < b.number ? 1 : -1;
          }
        });
      } else if (sortBy === "Date") {
        maybeSorted = maybeSorted.sort((a: Customer, b: Customer) => {
          if (a.date === b.date) return 0;
          if (order === "asc") {
            return a.date < b.date ? -1 : 1;
          } else {
            return a.date < b.date ? 1 : -1;
          }
        });
      } else if (sortBy === "Name") {
        maybeSorted = maybeSorted.sort((a: Customer, b: Customer) => {
          if (a.name === b.name) return 0;
          if (order === "asc") {
            return a.name < b.name ? -1 : 1;
          } else {
            return a.name < b.name ? 1 : -1;
          }
        });
      } else if (sortBy === "Description") {
        maybeSorted = maybeSorted.sort((a: Customer, b: Customer) => {
          if (a.description === b.description) return 0;
          if (order === "asc") {
            return a.description < b.description ? -1 : 1;
          } else {
            return a.description < b.description ? 1 : -1;
          }
        });
      }
    }

    if (search) {
      maybeSorted = maybeSorted.filter((s) =>
        s.name.toLowerCase().includes(search)
      );
    }
    setSortedCustomers(maybeSorted);
  }, [sortBy, order, search, customers]);

  return (
    <>
      <input
        type="text"
        onInput={(e) => setSearch(e.currentTarget.value)}
        style={{
          marginTop: 20,
          width: 300,
          padding: "5px 10px",
          marginBottom: 10,
        }}
        placeholder="Search by name.."
      />
      <table>
        <thead>
          {["Name", "Date", "Number", "Description"].map((header) => (
            <th onClick={() => toggleSort(header)} key={header}>
              {header} {sortBy === header ? (order === "asc" ? "↑" : "↓") : "-"}
            </th>
          ))}
        </thead>
        <tbody>
          {sortedCustomers.map((customer) => (
            <tr>
              <td>{customer.name}</td>
              <td>{new Date(customer.date).toLocaleDateString()}</td>
              <td>{customer.number}</td>
              <td>{customer.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Customers;
