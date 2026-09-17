from django.shortcuts import render
from rest_framework import generics
from .models import Student, Company, Placement
from .serializers import StudentSerializer, CompanySerializer, PlacementSerializer


def home(request):
    return render(request, 'index.html')


class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class PlacementListCreateView(generics.ListCreateAPIView):
    queryset = Placement.objects.all()
    serializer_class = PlacementSerializer


class PlacementDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Placement.objects.all()
    serializer_class = PlacementSerializer