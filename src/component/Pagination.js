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

  const lastPage = lastValue[0] ? lastValue[0].link.split("?page=")[1] : null;
  const nextPage = nextValue[0] ? nextValue[0].link.split("?page=")[1] : null;
  const currPage = nextPage - 1;
  const baseUrl = lastValue[0] ? lastValue[0].link.split("?page=")[0] : null;
  let listPage = [];

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
          firstValue && props.getAPIPagination(firstValue.link, props.token);
          props.setIsLoading(true);
        }}
      />
      <Pagination.Prev
        disabled={!preValue}
        onClick={() => {
          preValue && props.getAPIPagination(preValue.link, props.token);
          props.setIsLoading(true);
        }}
      />
      {listPage.map(item => {
        if (item >= currPage - 4 && item < currPage + 4)
          return (
            <Pagination.Item
              active={item === currPage}
              onClick={() => {
                props.getAPIPagination(baseUrl + `?page=${item}`, props.token);
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
          props.getAPIPagination(baseUrl + `?page=${lastPage}`, props.token);
          props.setIsLoading(true);
        }}
      >
        {lastPage && lastPage}
      </Pagination.Item>
      <Pagination.Next
        disabled={!nextValue}
        onClick={() => {
          props.getAPIPagination(nextValue[0].link, props.token);
          props.setIsLoading(true);
        }}
      />
      <Pagination.Last
        onClick={() => {
          props.getAPIPagination(lastValue[0].link, props.token);
          props.setIsLoading(true);
        }}
      />
    </Pagination>
  );
}
