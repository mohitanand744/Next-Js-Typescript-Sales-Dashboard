"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit2,
  Plus,
  Trash2
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the Customer type
type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  orders: number;
  region: string;
  segment: string;
};

export default function CustomersPage() {
  // Expanded customer data
  const [allCustomers, setAllCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      orders: 12,
      region: "North America",
      segment: "Enterprise",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      email: "maria@example.com",
      phone: "+1 (555) 234-5678",
      status: "Active",
      orders: 5,
      region: "South America",
      segment: "SMB",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 345-6789",
      status: "Inactive",
      orders: 3,
      region: "North America",
      segment: "Enterprise",
    },
    {
      id: 4,
      name: "Sarah Lee",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      status: "Active",
      orders: 8,
      region: "Europe",
      segment: "Mid-Market",
    },
    {
      id: 5,
      name: "David Kim",
      email: "david@example.com",
      phone: "+1 (555) 567-8901",
      status: "Active",
      orders: 15,
      region: "Asia",
      segment: "Enterprise",
    },
    {
      id: 6,
      name: "Lisa Chen",
      email: "lisa@example.com",
      phone: "+1 (555) 678-9012",
      status: "Inactive",
      orders: 0,
      region: "Asia",
      segment: "SMB",
    },
    {
      id: 7,
      name: "Michael Wilson",
      email: "michael@example.com",
      phone: "+1 (555) 789-0123",
      status: "Active",
      orders: 22,
      region: "North America",
      segment: "Enterprise",
    },
    {
      id: 8,
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "+1 (555) 890-1234",
      status: "Active",
      orders: 7,
      region: "Europe",
      segment: "Mid-Market",
    },
    {
      id: 9,
      name: "Daniel Martinez",
      email: "daniel@example.com",
      phone: "+1 (555) 901-2345",
      status: "Active",
      orders: 11,
      region: "South America",
      segment: "SMB",
    },
    {
      id: 10,
      name: "Olivia Taylor",
      email: "olivia@example.com",
      phone: "+1 (555) 012-3456",
      status: "Inactive",
      orders: 2,
      region: "Europe",
      segment: "Enterprise",
    },
    {
      id: 11,
      name: "James Anderson",
      email: "james@example.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      orders: 19,
      region: "North America",
      segment: "Mid-Market",
    },
    {
      id: 12,
      name: "Sophia Thomas",
      email: "sophia@example.com",
      phone: "+1 (555) 234-5678",
      status: "Active",
      orders: 8,
      region: "Asia",
      segment: "SMB",
    },
    {
      id: 13,
      name: "William Jackson",
      email: "william@example.com",
      phone: "+1 (555) 345-6789",
      status: "Inactive",
      orders: 0,
      region: "North America",
      segment: "Enterprise",
    },
    {
      id: 14,
      name: "Ava White",
      email: "ava@example.com",
      phone: "+1 (555) 456-7890",
      status: "Active",
      orders: 5,
      region: "Europe",
      segment: "SMB",
    },
    {
      id: 15,
      name: "Ethan Harris",
      email: "ethan@example.com",
      phone: "+1 (555) 567-8901",
      status: "Active",
      orders: 14,
      region: "Asia",
      segment: "Mid-Market",
    },
    {
      id: 16,
      name: "Isabella Martin",
      email: "isabella@example.com",
      phone: "+1 (555) 678-9012",
      status: "Active",
      orders: 9,
      region: "South America",
      segment: "Enterprise",
    },
  ]);

  // Dialog states
  const [open, setOpen] = useState(false);
  const [isViewingCustomer, setIsViewingCustomer] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form state for new customer
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    region: "",
    segment: "",
    orders: 0,
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    region?: string;
    segment?: string;
  }>({});

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for filters
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [segmentFilter, setSegmentFilter] = useState<string[]>([]);
  // State for filtered customers
  const [filteredCustomers, setFilteredCustomers] = useState(allCustomers);
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 8;

  // Reset form data
  const resetFormData = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "Active",
      region: "",
      segment: "",
      orders: 0,
    });
    setFormErrors({});
  };

  // Handle add dialog open/close
  const handleAddDialogChange = (open: boolean) => {
    if (open) {
      // Reset form data when opening the add dialog
      resetFormData();
    }
    setOpen(open);
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...allCustomers];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.includes(query)
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter((customer) =>
        statusFilter.includes(customer.status)
      );
    }

    // Apply region filter
    if (regionFilter.length > 0) {
      result = result.filter((customer) =>
        regionFilter.includes(customer.region)
      );
    }

    // Apply segment filter
    if (segmentFilter.length > 0) {
      result = result.filter((customer) =>
        segmentFilter.includes(customer.segment)
      );
    }

    setFilteredCustomers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allCustomers, searchQuery, statusFilter, regionFilter, segmentFilter]);

  // Get paginated customers
  const getPaginatedCustomers = () => {
    const startIndex = (currentPage - 1) * customersPerPage;
    return filteredCustomers.slice(startIndex, startIndex + customersPerPage);
  };

  // Calculate page count
  const pageCount = Math.ceil(filteredCustomers.length / customersPerPage);

  // Get unique values for filters
  const statuses = [...new Set(allCustomers.map((c) => c.status))];
  const regions = [...new Set(allCustomers.map((c) => c.region))];
  const segments = [...new Set(allCustomers.map((c) => c.segment))];

  // Toggle filter function
  const toggleFilter = (
    filter: string[],
    value: string,
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (filter.includes(value)) {
      setFilter(filter.filter((item) => item !== value));
    } else {
      setFilter([...filter, value]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter([]);
    setRegionFilter([]);
    setSegmentFilter([]);
    setSearchQuery("");
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      region?: string;
      segment?: string;
    } = {};

    if (!newCustomer.name?.trim()) {
      errors.name = "Name is required";
    }

    if (!newCustomer.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newCustomer.email)) {
      errors.email = "Email is invalid";
    }

    if (!newCustomer.phone?.trim()) {
      errors.phone = "Phone is required";
    }

    if (!newCustomer.region) {
      errors.region = "Region is required";
    }

    if (!newCustomer.segment) {
      errors.segment = "Segment is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Add new customer
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create new customer with unique ID
    const newId = Math.max(...allCustomers.map((c) => c.id)) + 1;
    const customerToAdd = {
      ...newCustomer,
      id: newId,
      orders: 0,
    } as Customer;

    // Add to customers list
    setAllCustomers([customerToAdd, ...allCustomers]);

    // Reset form
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "Active",
      region: "",
      segment: "",
      orders: 0,
    });

    // Close dialog
    setOpen(false);

    // Show success notification (if you have a toast component)
    if (typeof toast === 'function') {
      toast({
        title: "Customer added",
        description: `${customerToAdd.name} has been added to your customer list.`,
        type: "success",
        duration: 5000,
        position: "top-center",
      })
    }
  };

  // Handler for view customer details
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewingCustomer(true);
  };

  // Handler for edit customer
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
      region: customer.region,
      segment: customer.segment,
      orders: customer.orders,
    });
    setIsEditingCustomer(true);
  };

  // Update customer
  const handleUpdateCustomer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedCustomer) {
      return;
    }

    // Update customer in the list
    const updatedCustomers = allCustomers.map(customer =>
      customer.id === selectedCustomer.id
        ? { ...customer, ...newCustomer, id: selectedCustomer.id } as Customer
        : customer
    );

    setAllCustomers(updatedCustomers);

    // Reset form and close dialog
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "Active",
      region: "",
      segment: "",
      orders: 0,
    });
    setIsEditingCustomer(false);
    setSelectedCustomer(null);

    // Show success notification
    toast({
      title: "Customer updated",
      description: `${newCustomer.name} has been updated successfully.`,
      type: "success",
      duration: 5000,
      position: "top-center",
    });
  };

  // Close customer dialogs
  const closeCustomerDialogs = () => {
    setIsViewingCustomer(false);
    setIsEditingCustomer(false);
    setSelectedCustomer(null);
    resetFormData();
  };

  // Handler for delete customer
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCustomer) {
      setIsDeleteDialogOpen(true);
    }
  };

  // Delete customer
  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return;

    // Remove customer from the list
    const updatedCustomers = allCustomers.filter(customer => customer.id !== selectedCustomer.id);
    setAllCustomers(updatedCustomers);

    // Close dialogs
    setIsDeleteDialogOpen(false);
    setIsViewingCustomer(false);
    setIsEditingCustomer(false);

    // Show success notification
    toast({
      title: "Customer deleted",
      description: `${selectedCustomer.name} has been deleted from your customer list.`,
      type: "success",
      duration: 5000,
      position: "top-center",
    });

    // Reset selected customer
    setSelectedCustomer(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customers and review their purchase history.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-end w-full gap-2 sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <Badge className="ml-2 h-5 px-1.5 text-xs" variant="secondary">
                  {statusFilter.length +
                    regionFilter.length +
                    segmentFilter.length || 0}
                </Badge>
                <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[280px] max-h-[500px] overflow-auto"
              align="end"
            >
              <DropdownMenuLabel>Filter Customers</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">
                  Status
                </DropdownMenuLabel>
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={() =>
                      toggleFilter(statusFilter, status, setStatusFilter)
                    }
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">
                  Region
                </DropdownMenuLabel>
                {regions.map((region) => (
                  <DropdownMenuCheckboxItem
                    key={region}
                    checked={regionFilter.includes(region)}
                    onCheckedChange={() =>
                      toggleFilter(regionFilter, region, setRegionFilter)
                    }
                  >
                    {region}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">
                  Segment
                </DropdownMenuLabel>
                {segments.map((segment) => (
                  <DropdownMenuCheckboxItem
                    key={segment}
                    checked={segmentFilter.includes(segment)}
                    onCheckedChange={() =>
                      toggleFilter(segmentFilter, segment, setSegmentFilter)
                    }
                  >
                    {segment}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <Button
                variant="ghost"
                size="sm"
                className="justify-center w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={handleAddDialogChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9">
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new customer to your database.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCustomer} className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newCustomer.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={formErrors.name ? "border-red-500" : ""}
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newCustomer.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    defaultValue={newCustomer.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-right">
                    Region
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("region", value)
                    }
                  >
                    <SelectTrigger
                      className={formErrors.region ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="North America">
                        North America
                      </SelectItem>
                      <SelectItem value="South America">
                        South America
                      </SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Asia">Asia</SelectItem>
                      <SelectItem value="Africa">Africa</SelectItem>
                      <SelectItem value="Oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.region && (
                    <p className="text-sm text-red-500">{formErrors.region}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segment" className="text-right">
                    Segment
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("segment", value)
                    }
                  >
                    <SelectTrigger
                      className={formErrors.segment ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                      <SelectItem value="Mid-Market">Mid-Market</SelectItem>
                      <SelectItem value="SMB">SMB</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.segment && (
                    <p className="text-sm text-red-500">{formErrors.segment}</p>
                  )}
                </div>
                <DialogFooter className="pt-4 flex-col-reverse gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Customer</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>
                View and manage your customer database
              </CardDescription>
            </div>
            {(searchQuery ||
              statusFilter.length > 0 ||
              regionFilter.length > 0 ||
              segmentFilter.length > 0) && (
                <div className="text-sm text-muted-foreground">
                  Showing {filteredCustomers.length} of {allCustomers.length}{" "}
                  customers
                </div>
              )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden overflow-hidden border rounded-md md:block">
            <div className="grid grid-cols-12 px-4 py-3 text-sm font-medium border-b bg-muted/50">
              <div className="col-span-3">Customer</div>
              <div className="col-span-3">Contact</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Orders</div>
              <div className="col-span-2">Segment</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {getPaginatedCustomers().length > 0 ? (
                getPaginatedCustomers().map((customer) => (
                  <div
                    key={customer.id}
                    className="grid items-center grid-cols-12 px-4 py-3"
                  >
                    <div className="flex items-center col-span-3 gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`/avatars/0${(customer.id % 8) + 1}.png`}
                          alt={customer.name}
                        />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{customer.name}</div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-1 truncate">
                        <Mail className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm truncate">
                          {customer.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${customer.status === "Active"
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                          }`}
                      >
                        {customer.status}
                      </span>
                    </div>
                    <div className="col-span-1">{customer.orders}</div>
                    <div className="col-span-2">
                      <span className="text-sm">
                        {customer.segment}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({customer.region})
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-end col-span-2 gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        title="View Details"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        title="Edit Customer"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-muted-foreground">
                    No customers match your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={clearFilters}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {getPaginatedCustomers().length > 0 ? (
              getPaginatedCustomers().map((customer) => (
                <Card key={customer.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 p-4 border-b">
                      <Avatar>
                        <AvatarImage
                          src={`/avatars/0${(customer.id % 8) + 1}.png`}
                          alt={customer.name}
                        />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.segment} · {customer.region}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${customer.status === "Active"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                            }`}
                        >
                          {customer.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm truncate">
                          {customer.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm">
                          {customer.orders} Orders
                        </span>
                      </div>
                    </div>
                    <div className="flex border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 py-2 rounded-none"
                        onClick={() => handleViewCustomer(customer)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <div className="w-px h-10 bg-border" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 py-2 rounded-none"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="p-8 text-center border rounded-md">
                <p className="text-muted-foreground">
                  No customers match your criteria.
                </p>
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        {pageCount > 1 && (
          <CardFooter className="flex items-center justify-center gap-1 pt-8 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* View Customer Dialog */}
      <Dialog open={isViewingCustomer} onOpenChange={setIsViewingCustomer}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Detailed information about this customer.
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`/avatars/0${(selectedCustomer.id % 8) + 1}.png`}
                    alt={selectedCustomer.name}
                  />
                  <AvatarFallback>
                    {selectedCustomer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${selectedCustomer.status === "Active"
                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                    }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <div className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-medium">{selectedCustomer.region}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Segment</p>
                  <p className="font-medium">{selectedCustomer.segment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="font-medium">{selectedCustomer.orders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-medium">#{selectedCustomer.id}</p>
                </div>
              </div>

              <DialogFooter className="flex justify-between gap-3">
                <Button variant="destructive" onClick={handleDeleteClick}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button onClick={() => handleEditCustomer(selectedCustomer)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Customer
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditingCustomer} onOpenChange={setIsEditingCustomer}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update the details of this customer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateCustomer} className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-right">
                Full Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="edit-phone"
                name="phone"
                value={newCustomer.phone}
                onChange={handleInputChange}
                className={formErrors.phone ? "border-red-500" : ""}
              />
              {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select
                value={newCustomer.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-region" className="text-right">
                Region
              </Label>
              <Select
                value={newCustomer.region}
                onValueChange={(value) => handleSelectChange("region", value)}
              >
                <SelectTrigger className={formErrors.region ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.region && <p className="text-sm text-red-500">{formErrors.region}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-segment" className="text-right">
                Segment
              </Label>
              <Select
                value={newCustomer.segment}
                onValueChange={(value) => handleSelectChange("segment", value)}
              >
                <SelectTrigger className={formErrors.segment ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Mid-Market">Mid-Market</SelectItem>
                  <SelectItem value="SMB">SMB</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.segment && <p className="text-sm text-red-500">{formErrors.segment}</p>}
            </div>
            <DialogFooter className="flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteClick}
                className="order-1 sm:order-none"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="outline" onClick={closeCustomerDialogs}>
                  Cancel
                </Button>
                <Button type="submit">Update Customer</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the customer
              {selectedCustomer ? ` "${selectedCustomer.name}"` : ''} from your customer list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCustomer} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
