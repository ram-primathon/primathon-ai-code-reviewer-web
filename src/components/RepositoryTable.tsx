"use client";

import { useEffect, useState } from "react";
import { fetchGithubRepos } from "@prima/api";
import { IRepository } from "@prima/api/IRepository";
import { showToast } from "@prima/utils/showToast";
import { Space, Table, TableProps, Tag } from "@prima/external/antd";

interface DataType {
  key: string;
  name: string;
  start: number;
  svn_url: string;
  language: string[];
}

const getTableData = (repositories: IRepository[]): DataType[] => {
  return repositories.map((repo) => ({
    key: repo.id.toString(),
    name: repo.name,
    start: repo.stargazers_count,
    language: repo.language ? [repo.language] : [],
    svn_url: repo.svn_url,
  }));
};

const getColumns = (): TableProps<DataType>["columns"] => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => (
        <a href={record.svn_url} target='_blank'>
          {text}
        </a>
      ),
    },
    {
      title: "Stars",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "Language",
      key: "language",
      dataIndex: "language",
      render: (_, { language }) => (
        <>
          {language.map((language) => {
            return <Tag key={language}>{language.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <Space size='middle'>Edit</Space>,
    },
  ];
};

interface RepositoryTableProps {
  token: string;
}

const RepositoryTable = ({ token }: RepositoryTableProps) => {
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchGithubRepos(token as string);
        if (response.data) {
          setRepositories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      getUser();
    } else {
      showToast("Token is not available", "error");
    }
  }, [token]);

  return (
    <div className='mt-5'>
      <Table columns={getColumns()} dataSource={getTableData(repositories)} />
    </div>
  );
};

export default RepositoryTable;
