import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationPack(props) {
  const nextValue = props.pageStatus
    ? props.pageStatus.filter(({ value }) => {
        return value === "rel=next";
      })
    : "";
  const preValue = props.pageStatus
    ? props.pageStatus.filter(({ value }) => {
        return value === "rel=prev";
      })[0]
    : "";
  const firstValue = props.pageStatus
    ? props.pageStatus.filter(({ value }) => {
        return value === "rel=first";
      })[0]
    : "";
  const lastValue = props.pageStatus
    ? props.pageStatus.filter(({ value }) => {
        return value === "rel=last";
      })
    : "";

  const lastPage = lastValue[0] ? lastValue[0].link.split("&page=")[1] : null;
  const nextPage = nextValue[0] ? nextValue[0].link.split("&page=")[1] : null;
  const currPage = nextPage - 1;
  const baseUrl = lastValue[0] ? lastValue[0].link.split("&page=")[0] : null;
  let listPage = [];
  console.log("last page", lastPage);

  if (lastPage) {
    for (let i = 1; i < lastPage; i++) {
      listPage.push(i);
    }
  }

  return (
    <Pagination>
      <Pagination.First
        disabled={!firstValue}
        onClick={() => {
          firstValue && props.getAPI(firstValue.link);
          props.setIsLoading(true);
        }}
      />
      <Pagination.Prev
        disabled={!preValue}
        onClick={() => {
          preValue && props.getAPI(preValue.link);
          props.setIsLoading(true);
        }}
      />
      {listPage.map(item => {
        if (item >= currPage - 2 && item < currPage + 2)
          return (
            <Pagination.Item
              active={item === currPage}
              onClick={() => {
                props.getAPI(baseUrl + `&page=${item}`);
                props.setIsLoading(true);
              }}
            >
              {item}
            </Pagination.Item>
          );
      })}
      <Pagination.Ellipsis />

      <Pagination.Item
        onClick={() => {
          props.getAPI(baseUrl + `&page=${lastPage}`);
          props.setIsLoading(true);
        }}
      >
        {lastPage && lastPage}
      </Pagination.Item>
      <Pagination.Next
        disabled={!nextValue}
        onClick={() => {
          props.getAPI(nextValue[0].link);
          props.setIsLoading(true);
        }}
      />
      <Pagination.Last
        onClick={() => {
          props.getAPI(lastValue[0].link);
          props.setIsLoading(true);
        }}
      />
    </Pagination>
  );
}
