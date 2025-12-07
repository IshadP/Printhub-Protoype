'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const StorageContext = createContext();

export function StorageProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]); // IDs of selected files
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Load from Session Storage on mount
  useEffect(() => {
    const storedFiles = sessionStorage.getItem('ph_files');
    const storedOrders = sessionStorage.getItem('ph_orders');

    if (storedFiles) setFiles(JSON.parse(storedFiles));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  // Save to Session Storage on change
  useEffect(() => {
    sessionStorage.setItem('ph_files', JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    sessionStorage.setItem('ph_orders', JSON.stringify(orders));
  }, [orders]);

  // --- Actions ---

  const addFiles = (newFiles) => {
    // newFiles should be an array of file objects
    // { id, name, type, size, pages, date, config: { copies: 1, color: false, ... } }
    setFiles(prev => [...prev, ...newFiles]);
  };

  const updateFileConfig = (fileId, newConfig) => {
    setFiles(prev => prev.map(f =>
      f.id === fileId ? { ...f, config: { ...f.config, ...newConfig } } : f
    ));
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setCart(prev => prev.filter(id => id !== fileId));
    // If we removed the last selected item, exit selection mode
    setCart(prev => {
      const newCart = prev.filter(id => id !== fileId);
      if (prev.length > 0 && newCart.length === 0) {
        setIsSelectionMode(false);
      }
      return newCart;
    });
  };

  const toggleSelection = (fileId) => {
    setCart(prev => {
      if (prev.includes(fileId)) {
        const newCart = prev.filter(id => id !== fileId);
        if (newCart.length === 0) setIsSelectionMode(false);
        return newCart;
      } else {
        return [...prev, fileId];
      }
    });
  };

  const enterSelectionMode = (initialFileId) => {
    setIsSelectionMode(true);
    setCart([initialFileId]);
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setCart([]);
  };

  const createOrder = (paymentDetails) => {
    const selectedFiles = files.filter(f => cart.includes(f.id));
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: selectedFiles,
      total: selectedFiles.reduce((acc, file) => acc + (file.config.copies * 10), 0), // Mock calc
      status: 'completed',
      printer: 'Printer A1'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsSelectionMode(false);
    return newOrder.id;
  };

  const clearSession = () => {
    setFiles([]);
    setOrders([]);
    setCart([]);
    setIsSelectionMode(false);
    sessionStorage.clear();
  };

  return (
    <StorageContext.Provider value={{
      files,
      orders,
      cart,
      isSelectionMode,
      addFiles,
      updateFileConfig,
      removeFile,
      toggleSelection,
      enterSelectionMode,
      exitSelectionMode,
      createOrder,
      clearSession
    }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  return useContext(StorageContext);
}