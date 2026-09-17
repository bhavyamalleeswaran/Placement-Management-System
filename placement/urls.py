from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.StudentListCreateView.as_view()),
    path('students/<int:pk>/', views.StudentDetailView.as_view()),
    path('companies/', views.CompanyListCreateView.as_view()),
    path('companies/<int:pk>/', views.CompanyDetailView.as_view()),
    path('placements/', views.PlacementListCreateView.as_view()),
    path('placements/<int:pk>/', views.PlacementDetailView.as_view()),
]