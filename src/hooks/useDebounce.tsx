import React, { useState, useEffect, useRef, useCallback } from "react";
function useDebounce(fn: Function, delay: number, dep = []) {
 const { current }: any = useRef({ fn, timer: null });
 useEffect(function () {
  current.fn = fn;
 }, [fn]);

 return useCallback(function f(...args) {
  if (current.timer) {
   clearTimeout(current.timer);
  }
  current.timer = setTimeout(() => {
   current.fn(...args);
  }, delay);
 }, dep)
}
export default useDebounce