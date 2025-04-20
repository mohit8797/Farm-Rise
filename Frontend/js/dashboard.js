

// document.addEventListener('DOMContentLoaded', function() {
//   // DOM Elements
//   const dateRangeInput = document.getElementById('date-range');
//   const applyFilterBtn = document.getElementById('apply-filter');
//   const resetFilterBtn = document.getElementById('reset-filter');
//   const exportDataBtn = document.getElementById('export-data');
//   const importDataBtn = document.getElementById('import-data');
//   const importModal = document.getElementById('import-modal');
//   const importFileInput = document.getElementById('import-file');
//   const confirmImportBtn = document.getElementById('confirm-import');
//   const importStatus = document.getElementById('import-status');
//   const closeModal = document.querySelector('.close');

//   // Initialize date range picker
//   flatpickr(dateRangeInput, {
//       mode: 'range',
//       dateFormat: 'Y-m-d',
//       defaultDate: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]
//   });

//   // Chart initialization
//   const harvestChartCtx = document.getElementById('harvest-chart').getContext('2d');
//   let harvestChart = new Chart(harvestChartCtx, {
//       type: 'bar',
//       data: {
//           labels: ['Crops', 'Fruits', 'Vegetables'],
//           datasets: [{
//               label: 'Growing',
//               data: [0, 0, 0],
//               backgroundColor: '#4CAF50',
//               borderColor: '#4CAF50',
//               borderWidth: 1
//           }, {
//               label: 'Harvested',
//               data: [0, 0, 0],
//               backgroundColor: '#FF9800',
//               borderColor: '#FF9800',
//               borderWidth: 1
//           }]
//       },
//       options: {
//           responsive: true,
//           scales: {
//               y: {
//                   beginAtZero: true
//               }
//           },
//           plugins: {
//               legend: {
//                   position: 'top',
//               },
//               tooltip: {
//                   callbacks: {
//                       label: function(context) {
//                           return `${context.dataset.label}: ${context.raw} items`;
//                       }
//                   }
//               }
//           }
//       }
//   });

//   // Load dashboard data
//   function loadDashboardData(startDate = null, endDate = null) {
//       const crops = JSON.parse(localStorage.getItem('crops')) || [];
//       const fruits = JSON.parse(localStorage.getItem('fruits')) || [];
//       const vegetables = JSON.parse(localStorage.getItem('vegetables')) || [];
      
//       // Filter by date range if provided
//       const filterByDate = (items) => {
//           if (!startDate || !endDate) return items;
//           return items.filter(item => {
//               const plantedDate = new Date(item.plantedDate);
//               return plantedDate >= new Date(startDate) && plantedDate <= new Date(endDate);
//           });
//       };

//       const filteredCrops = filterByDate(crops);
//       const filteredFruits = filterByDate(fruits);
//       const filteredVegetables = filterByDate(vegetables);

//       // Update stats cards
//       document.getElementById('total-crops').textContent = filteredCrops.length;
//       document.getElementById('total-fruits').textContent = filteredFruits.length;
//       document.getElementById('total-vegetables').textContent = filteredVegetables.length;
      
//       // Calculate total value
//       const totalValue = [...filteredCrops, ...filteredFruits, ...filteredVegetables]
//           .reduce((sum, item) => sum + (item.price * item.quantity), 0);
//       document.getElementById('total-value').textContent = `$${totalValue.toFixed(2)}`;

//       // Update chart data
//       harvestChart.data.datasets[0].data = [
//           filteredCrops.filter(c => c.status === 'Growing').length,
//           filteredFruits.filter(f => f.status === 'Growing').length,
//           filteredVegetables.filter(v => v.status === 'Growing').length
//       ];
//       harvestChart.data.datasets[1].data = [
//           filteredCrops.filter(c => c.status === 'Harvested').length,
//           filteredFruits.filter(f => f.status === 'Harvested').length,
//           filteredVegetables.filter(v => v.status === 'Harvested').length
//       ];
//       harvestChart.update();

//       // Load recent activity
//       loadRecentActivity([...filteredCrops, ...filteredFruits, ...filteredVegetables]);

//       // Load upcoming harvests
//       loadUpcomingHarvests([...filteredCrops, ...filteredFruits, ...filteredVegetables]);
//   }

//   // Load recent activity
//   function loadRecentActivity(items) {
//       const activityList = document.getElementById('activity-list');
//       activityList.innerHTML = '';
      
//       // Sort by planted date (newest first)
//       const sortedItems = [...items].sort((a, b) => 
//           new Date(b.plantedDate) - new Date(a.plantedDate)).slice(0, 5);
      
//       sortedItems.forEach(item => {
//           const activityItem = document.createElement('div');
//           activityItem.className = 'activity-item';
          
//           const iconClass = item.status === 'Harvested' ? 'fa-check-circle' : 'fa-seedling';
//           const iconColor = item.status === 'Harvested' ? '#4CAF50' : '#2196F3';
          
//           activityItem.innerHTML = `
//               <div class="activity-icon" style="background-color: ${iconColor}20; color: ${iconColor}">
//                   <i class="fas ${iconClass}"></i>
//               </div>
//               <div class="activity-info">
//                   <h4>${item.name} ${item.status === 'Harvested' ? 'harvested' : 'planted'}</h4>
//                   <p>${formatDate(item.plantedDate)}</p>
//               </div>
//           `;
          
//           activityList.appendChild(activityItem);
//       });
//   }

//   // Load upcoming harvests
//   function loadUpcomingHarvests(items) {
//       const upcomingHarvests = document.getElementById('upcoming-harvests');
//       upcomingHarvests.innerHTML = '';
      
//       // Filter items with harvest date in the future and status "Growing"
//       const now = new Date();
//       const upcomingItems = items.filter(item => 
//           item.harvestDate && 
//           new Date(item.harvestDate) > now && 
//           item.status === 'Growing'
//       ).sort((a, b) => new Date(a.harvestDate) - new Date(b.harvestDate)).slice(0, 4);
      
//       if (upcomingItems.length === 0) {
//           upcomingHarvests.innerHTML = '<p>No upcoming harvests</p>';
//           return;
//       }
      
//       upcomingItems.forEach(item => {
//           const harvestItem = document.createElement('div');
//           harvestItem.className = 'harvest-item';
          
//           harvestItem.innerHTML = `
//               <img src="${item.image || '/Images/placeholder.jpg'}" alt="${item.name}">
//               <div class="harvest-info">
//                   <h4>${item.name}</h4>
//                   <p>Harvest: ${formatDate(item.harvestDate)}</p>
//                   <p>${daysUntil(item.harvestDate)} days remaining</p>
//               </div>
//           `;
          
//           upcomingHarvests.appendChild(harvestItem);
//       });
//   }

//   // Helper function to format date
//   function formatDate(dateString) {
//       if (!dateString) return 'N/A';
//       const options = { year: 'numeric', month: 'short', day: 'numeric' };
//       return new Date(dateString).toLocaleDateString(undefined, options);
//   }

//   // Helper function to calculate days until harvest
//   function daysUntil(harvestDate) {
//       const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//       const today = new Date();
//       const harvestDay = new Date(harvestDate);
//       return Math.round(Math.abs((harvestDay - today) / oneDay));
//   }

//   // Apply date filter
//   applyFilterBtn.addEventListener('click', () => {
//       const dates = dateRangeInput.value.split(' to ');
//       if (dates.length === 2) {
//           loadDashboardData(dates[0], dates[1]);
//       } else {
//           alert('Please select a valid date range');
//       }
//   });

//   // Reset filter
//   resetFilterBtn.addEventListener('click', () => {
//       dateRangeInput.value = '';
//       loadDashboardData();
//   });

//   // Export data
// //   exportDataBtn.addEventListener('click', () => {
// //       const data = {
// //           crops: JSON.parse(localStorage.getItem('crops')) || [],
// //           fruits: JSON.parse(localStorage.getItem('fruits')) || [],
// //           vegetables: JSON.parse(localStorage.getItem('vegetables')) || []
// //       };
      
// //       const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
// //       const url = URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       a.download = `farmrise-data-${new Date().toISOString().split('T')[0]}.json`;
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //       URL.revokeObjectURL(url);
// //   });
// // Export data (updated for PDF)
// exportDataBtn.addEventListener('click', () => {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();
    
//     const data = {
//         crops: JSON.parse(localStorage.getItem('crops')) || [],
//         fruits: JSON.parse(localStorage.getItem('fruits')) || [],
//         vegetables: JSON.parse(localStorage.getItem('vegetables')) || []
//     };
    
//     // Add title
//     doc.setFontSize(18);
//     doc.text('FarmRise Data Export', 105, 15, { align: 'center' });
//     doc.setFontSize(12);
//     doc.text(`Exported on: ${new Date().toLocaleString()}`, 105, 22, { align: 'center' });
    
//     // Export each category as a separate table
//     let yPosition = 30;
    
//     const exportCategory = (categoryName, items) => {
//         if (items.length === 0) return;
        
//         doc.setFontSize(14);
//         doc.text(`${categoryName} (${items.length})`, 14, yPosition);
//         yPosition += 8;
        
//         const headers = [['Name', 'Quantity', 'Planted Date', 'Harvest Date', 'Status', 'Price']];
//         const tableData = items.map(item => [
//             item.name,
//             item.quantity,
//             formatDate(item.plantedDate),
//             formatDate(item.harvestDate),
//             item.status,
//             `$${item.price}`
//         ]);
        
//         doc.autoTable({
//             startY: yPosition,
//             head: headers,
//             body: tableData,
//             theme: 'grid',
//             headStyles: { fillColor: '#4CAF50' }
//         });
        
//         yPosition = doc.lastAutoTable.finalY + 10;
//     };
    
//     exportCategory('Crops', data.crops);
//     exportCategory('Fruits', data.fruits);
//     exportCategory('Vegetables', data.vegetables);
    
//     // Save the PDF
//     doc.save(`farmrise-export-${new Date().toISOString().split('T')[0]}.pdf`);
// });



//   // Open import modal
//   importDataBtn.addEventListener('click', () => {
//       importModal.style.display = 'block';
//   });

//   // Close modal
//   closeModal.addEventListener('click', () => {
//       importModal.style.display = 'none';
//       importStatus.textContent = '';
//       importStatus.className = 'status-message';
//   });

//   // Confirm import
//   confirmImportBtn.addEventListener('click', () => {
//       const file = importFileInput.files[0];
//       if (!file) {
//           importStatus.textContent = 'Please select a file first';
//           importStatus.className = 'status-message error';
//           return;
//       }
      
//       const reader = new FileReader();
//       reader.onload = (e) => {
//           try {
//               const data = JSON.parse(e.target.result);
              
//               // Basic validation
//               if (!data.crops || !data.fruits || !data.vegetables) {
//                   throw new Error('Invalid data format');
//               }
              
//               // Save to localStorage
//               localStorage.setItem('crops', JSON.stringify(data.crops));
//               localStorage.setItem('fruits', JSON.stringify(data.fruits));
//               localStorage.setItem('vegetables', JSON.stringify(data.vegetables));
              
//               importStatus.textContent = 'Data imported successfully!';
//               importStatus.className = 'status-message success';
              
//               // Reload dashboard
//               setTimeout(() => {
//                   importModal.style.display = 'none';
//                   loadDashboardData();
//               }, 1500);
//           } catch (error) {
//               importStatus.textContent = 'Error: Invalid JSON file';
//               importStatus.className = 'status-message error';
//               console.error('Import error:', error);
//           }
//       };
//       reader.onerror = () => {
//           importStatus.textContent = 'Error reading file';
//           importStatus.className = 'status-message error';
//       };
//       reader.readAsText(file);
//   });

//   // Close modal when clicking outside
//   window.addEventListener('click', (event) => {
//       if (event.target === importModal) {
//           importModal.style.display = 'none';
//           importStatus.textContent = '';
//           importStatus.className = 'status-message';
//       }
//   });

//   // Initial load
//   loadDashboardData();
// });

// // Logout functionality
// document.getElementById('logout-btn').addEventListener('click', () => {
//     // Clear any local storage if needed
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
    
//     // Redirect to home page
//     window.location.href = '/Frontend/index.html';
// });

// function loadFarmerOrders() {
//     const ordersList = document.getElementById('orders-list');
//     if (!ordersList) return;
    
//     const orders = JSON.parse(localStorage.getItem('farmerOrders')) || [];
    
//     if (orders.length === 0) {
//         ordersList.innerHTML = '<p>No orders yet</p>';
//         return;
//     }
    
//     // Show only recent 5 orders
//     const recentOrders = orders.slice(0, 5);
    
//     ordersList.innerHTML = recentOrders.map(order => `
//         <div class="order-card">
//             <div class="order-header">
//                 <span class="order-id">${order.orderId}</span>
//                 <span class="order-date">${formatDate(order.date)}</span>
//             </div>
//             <div class="order-customer">Customer: ${order.customer}</div>
//             <div class="order-items">
//                 ${order.items.map(item => `
//                     <div class="order-item">
//                         <span>${item.name} × ${item.quantity}</span>
//                         <span>₹${item.price * item.quantity}</span>
//                     </div>
//                 `).join('')}
//             </div>
//             <div class="order-total">Total: ₹${order.total}</div>
//             <div class="order-status status-${order.status.toLowerCase()}">${order.status}</div>
//         </div>
//     `).join('');
// }

// // Call this function in your loadDashboardData function
// // Modified loadFarmerOrders function
// function loadFarmerOrders(startDate = null, endDate = null) {
//     const ordersList = document.getElementById('orders-list');
//     if (!ordersList) return;
    
//     let orders = JSON.parse(localStorage.getItem('farmerOrders')) || [];
    
//     // Filter by date if provided
//     if (startDate && endDate) {
//         orders = orders.filter(order => {
//             const orderDate = new Date(order.date);
//             return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
//         });
//     }

//     // Group items by order
//     const orderGroups = {};
//     orders.forEach(order => {
//         if (!orderGroups[order.orderId]) {
//             orderGroups[order.orderId] = {
//                 ...order,
//                 items: []
//             };
//         }
//         orderGroups[order.orderId].items.push(...order.items);
//     });

//     // Convert to array and sort by date
//     const sortedOrders = Object.values(orderGroups)
//         .sort((a, b) => new Date(b.date) - new Date(a.date))
//         .slice(0, 5); // Show only 5 most recent

//     if (sortedOrders.length === 0) {
//         ordersList.innerHTML = '<p>No orders yet</p>';
//         return;
//     }

//     ordersList.innerHTML = sortedOrders.map(order => `
//         <div class="order-card">
//             <div class="order-header">
//                 <span class="order-id">${order.orderId}</span>
//                 <span class="order-date">${formatDate(order.date)}</span>
//             </div>
//             <div class="order-customer">Customer: ${order.customer}</div>
//             <div class="order-items">
//                 ${order.items.map(item => `
//                     <div class="order-item">
//                         <span>${item.name} × ${item.quantity}</span>
//                         <span>₹${(item.price * item.quantity).toFixed(2)}</span>
//                     </div>
//                 `).join('')}
//             </div>
//             <div class="order-total">Total: ₹${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</div>
//             <div class="order-status status-${order.status.toLowerCase()}">${order.status}</div>
//         </div>
//     `).join('');
// }
// // Call this function in your loadDashboardData function
// function loadDashboardData(startDate = null, endDate = null) {
//     // ... existing code ...
//     loadFarmerOrders(); // Add this line
// }


// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const dateRangeInput = document.getElementById('date-range');
    const applyFilterBtn = document.getElementById('apply-filter');
    const resetFilterBtn = document.getElementById('reset-filter');
    const exportDataBtn = document.getElementById('export-data');
    const importDataBtn = document.getElementById('import-data');
    const importModal = document.getElementById('import-modal');
    const importFileInput = document.getElementById('import-file');
    const confirmImportBtn = document.getElementById('confirm-import');
    const importStatus = document.getElementById('import-status');
    const closeModal = document.querySelector('.close');
  
    // Initialize date range picker
    if (dateRangeInput) {
      flatpickr(dateRangeInput, {
        mode: 'range',
        dateFormat: 'Y-m-d',
        defaultDate: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]
      });
    }
  
    // Chart initialization
    let harvestChart;
    const harvestChartCtx = document.getElementById('harvest-chart')?.getContext('2d');
    if (harvestChartCtx) {
      harvestChart = new Chart(harvestChartCtx, {
        type: 'bar',
        data: {
          labels: ['Crops', 'Fruits', 'Vegetables'],
          datasets: [{
            label: 'Growing',
            data: [0, 0, 0],
            backgroundColor: '#4CAF50',
            borderColor: '#4CAF50',
            borderWidth: 1
          }, {
            label: 'Harvested',
            data: [0, 0, 0],
            backgroundColor: '#FF9800',
            borderColor: '#FF9800',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw} items`;
                }
              }
            }
          }
        }
      });
    }
  
    // Main load dashboard function
    function loadDashboardData(startDate = null, endDate = null) {
      try {
        // Load and filter data
        const crops = JSON.parse(localStorage.getItem('crops')) || [];
        const fruits = JSON.parse(localStorage.getItem('fruits')) || [];
        const vegetables = JSON.parse(localStorage.getItem('vegetables')) || [];
        
        const filterByDate = (items) => {
          if (!startDate || !endDate) return items;
          return items.filter(item => {
            const itemDate = new Date(item.plantedDate || item.date);
            return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
          });
        };
  
        const filteredCrops = filterByDate(crops);
        const filteredFruits = filterByDate(fruits);
        const filteredVegetables = filterByDate(vegetables);
  
        // Update stats cards
        updateElementText('total-crops', filteredCrops.length);
        updateElementText('total-fruits', filteredFruits.length);
        updateElementText('total-vegetables', filteredVegetables.length);
        
        // Calculate total value
        const totalValue = [...filteredCrops, ...filteredFruits, ...filteredVegetables]
          .reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
        updateElementText('total-value', `$${totalValue.toFixed(2)}`);
  
        // Update chart if exists
        if (harvestChart) {
          harvestChart.data.datasets[0].data = [
            filteredCrops.filter(c => c.status === 'Growing').length,
            filteredFruits.filter(f => f.status === 'Growing').length,
            filteredVegetables.filter(v => v.status === 'Growing').length
          ];
          harvestChart.data.datasets[1].data = [
            filteredCrops.filter(c => c.status === 'Harvested').length,
            filteredFruits.filter(f => f.status === 'Harvested').length,
            filteredVegetables.filter(v => v.status === 'Harvested').length
          ];
          harvestChart.update();
        }
  
        // Load recent activity
        loadRecentActivity([...filteredCrops, ...filteredFruits, ...filteredVegetables]);
  
        // Load upcoming harvests
        loadUpcomingHarvests([...filteredCrops, ...filteredFruits, ...filteredVegetables]);
  
        // Load farmer orders
        loadFarmerOrders(startDate, endDate);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    }
  
    // Helper to safely update element text
    function updateElementText(id, text) {
      const element = document.getElementById(id);
      if (element) element.textContent = text;
    }
  
    // Load recent activity
    function loadRecentActivity(items) {
      const activityList = document.getElementById('activity-list');
      if (!activityList) return;
      
      activityList.innerHTML = '';
      
      const sortedItems = [...items]
        .sort((a, b) => new Date(b.plantedDate || b.date) - new Date(a.plantedDate || a.date))
        .slice(0, 5);
      
      sortedItems.forEach(item => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const iconClass = item.status === 'Harvested' ? 'fa-check-circle' : 'fa-seedling';
        const iconColor = item.status === 'Harvested' ? '#4CAF50' : '#2196F3';
        
        activityItem.innerHTML = `
          <div class="activity-icon" style="background-color: ${iconColor}20; color: ${iconColor}">
            <i class="fas ${iconClass}"></i>
          </div>
          <div class="activity-info">
            <h4>${item.name} ${item.status === 'Harvested' ? 'harvested' : 'planted'}</h4>
            <p>${formatDate(item.plantedDate || item.date)}</p>
          </div>
        `;
        
        activityList.appendChild(activityItem);
      });
    }
  
    // Load upcoming harvests
    function loadUpcomingHarvests(items) {
      const upcomingHarvests = document.getElementById('upcoming-harvests');
      if (!upcomingHarvests) return;
      
      upcomingHarvests.innerHTML = '';
      
      const now = new Date();
      const upcomingItems = items.filter(item => 
        item.harvestDate && 
        new Date(item.harvestDate) > now && 
        item.status === 'Growing'
      ).sort((a, b) => new Date(a.harvestDate) - new Date(b.harvestDate))
       .slice(0, 4);
      
      if (upcomingItems.length === 0) {
        upcomingHarvests.innerHTML = '<p>No upcoming harvests</p>';
        return;
      }
      
      upcomingItems.forEach(item => {
        const harvestItem = document.createElement('div');
        harvestItem.className = 'harvest-item';
        
        harvestItem.innerHTML = `
          <img src="${item.image || '/Images/placeholder.jpg'}" alt="${item.name}">
          <div class="harvest-info">
            <h4>${item.name}</h4>
            <p>Harvest: ${formatDate(item.harvestDate)}</p>
            <p>${daysUntil(item.harvestDate)} days remaining</p>
          </div>
        `;
        
        upcomingHarvests.appendChild(harvestItem);
      });
    }
  
    // Helper function to format date
    function formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      } catch {
        return 'Invalid Date';
      }
    }
  
    // Helper function to calculate days until harvest
    function daysUntil(harvestDate) {
      try {
        const oneDay = 24 * 60 * 60 * 1000;
        const today = new Date();
        const harvestDay = new Date(harvestDate);
        return Math.round(Math.abs((harvestDay - today) / oneDay));
      } catch {
        return 'N/A';
      }
    }
  
    // Apply date filter
    if (applyFilterBtn) {
      applyFilterBtn.addEventListener('click', () => {
        const dates = dateRangeInput.value.split(' to ');
        if (dates.length === 2) {
          loadDashboardData(dates[0], dates[1]);
        } else {
          alert('Please select a valid date range');
        }
      });
    }
  
    // Reset filter
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        if (dateRangeInput) dateRangeInput.value = '';
        loadDashboardData();
      });
    }
  
    // Export data as PDF
    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', () => {
        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          
          const data = {
            crops: JSON.parse(localStorage.getItem('crops')) || [],
            fruits: JSON.parse(localStorage.getItem('fruits')) || [],
            vegetables: JSON.parse(localStorage.getItem('vegetables')) || []
          };
          
          // Add title
          doc.setFontSize(18);
          doc.text('FarmRise Data Export', 105, 15, { align: 'center' });
          doc.setFontSize(12);
          doc.text(`Exported on: ${new Date().toLocaleString()}`, 105, 22, { align: 'center' });
          
          let yPosition = 30;
          
          const exportCategory = (categoryName, items) => {
            if (items.length === 0) return;
            
            doc.setFontSize(14);
            doc.text(`${categoryName} (${items.length})`, 14, yPosition);
            yPosition += 8;
            
            const headers = [['Name', 'Quantity', 'Planted Date', 'Harvest Date', 'Status', 'Price']];
            const tableData = items.map(item => [
              item.name || 'N/A',
              item.quantity || 1,
              formatDate(item.plantedDate),
              formatDate(item.harvestDate),
              item.status || 'N/A',
              `$${(item.price || 0).toFixed(2)}`
            ]);
            
            doc.autoTable({
              startY: yPosition,
              head: headers,
              body: tableData,
              theme: 'grid',
              headStyles: { fillColor: '#4CAF50' }
            });
            
            yPosition = doc.lastAutoTable.finalY + 10;
          };
          
          exportCategory('Crops', data.crops);
          exportCategory('Fruits', data.fruits);
          exportCategory('Vegetables', data.vegetables);
          
          doc.save(`farmrise-export-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
          console.error('Export failed:', error);
          alert('Failed to generate PDF. Please try again.');
        }
      });
    }
  
    // Data import functionality
    if (importDataBtn && importModal) {
      importDataBtn.addEventListener('click', () => {
        importModal.style.display = 'block';
      });
    }
  
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        if (importModal) importModal.style.display = 'none';
        if (importStatus) {
          importStatus.textContent = '';
          importStatus.className = 'status-message';
        }
      });
    }
  
    if (confirmImportBtn) {
      confirmImportBtn.addEventListener('click', () => {
        const file = importFileInput?.files[0];
        if (!file) {
          if (importStatus) {
            importStatus.textContent = 'Please select a file first';
            importStatus.className = 'status-message error';
          }
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            
            if (!data.crops || !data.fruits || !data.vegetables) {
              throw new Error('Invalid data format');
            }
            
            localStorage.setItem('crops', JSON.stringify(data.crops));
            localStorage.setItem('fruits', JSON.stringify(data.fruits));
            localStorage.setItem('vegetables', JSON.stringify(data.vegetables));
            
            if (importStatus) {
              importStatus.textContent = 'Data imported successfully!';
              importStatus.className = 'status-message success';
            }
            
            setTimeout(() => {
              if (importModal) importModal.style.display = 'none';
              loadDashboardData();
            }, 1500);
          } catch (error) {
            if (importStatus) {
              importStatus.textContent = 'Error: Invalid JSON file';
              importStatus.className = 'status-message error';
            }
            console.error('Import error:', error);
          }
        };
        reader.onerror = () => {
          if (importStatus) {
            importStatus.textContent = 'Error reading file';
            importStatus.className = 'status-message error';
          }
        };
        reader.readAsText(file);
      });
    }
  
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target === importModal && importModal) {
        importModal.style.display = 'none';
        if (importStatus) {
          importStatus.textContent = '';
          importStatus.className = 'status-message';
        }
      }
    });
  
    // Load farmer orders
    function loadFarmerOrders(startDate = null, endDate = null) {
      const ordersList = document.getElementById('orders-list');
      if (!ordersList) return;
      
      try {
        let orders = JSON.parse(localStorage.getItem('farmerOrders')) || [];
        
        if (startDate && endDate) {
          orders = orders.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
          });
        }
  
        const orderGroups = {};
        orders.forEach(order => {
          if (!orderGroups[order.orderId]) {
            orderGroups[order.orderId] = {
              ...order,
              items: []
            };
          }
          orderGroups[order.orderId].items.push(...order.items);
        });
  
        const sortedOrders = Object.values(orderGroups)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
  
        if (sortedOrders.length === 0) {
          ordersList.innerHTML = '<p>No orders yet</p>';
          return;
        }
  
        ordersList.innerHTML = sortedOrders.map(order => `
          <div class="order-card">
            <div class="order-header">
              <span class="order-id">${order.orderId}</span>
              <span class="order-date">${formatDate(order.date)}</span>
            </div>
            <div class="order-customer">Customer: ${order.customer}</div>
            <div class="order-items">
              ${order.items.map(item => `
                <div class="order-item">
                  <span>${item.name} × ${item.quantity}</span>
                  <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `).join('')}
            </div>
            <div class="order-total">Total: ₹${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</div>
            <div class="order-status status-${order.status.toLowerCase()}">${order.status}</div>
          </div>
        `).join('');
      } catch (error) {
        console.error('Error loading orders:', error);
        ordersList.innerHTML = '<p>Error loading orders</p>';
      }
    }
  
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/Frontend/index.html';
      });
    }
  
    // Initial load
    loadDashboardData();
  });