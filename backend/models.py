from sqlalchemy import Column, String, Integer, DateTime, Numeric, ForeignKey, JSON, Date
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
import datetime
from .database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="CLIENT") # CA or CLIENT
    ca_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    documents = relationship("Document", back_populates="owner")
    tax_profile = relationship("TaxProfile", back_populates="user", uselist=False)
    transactions = relationship("Transaction", back_populates="user")
    
class Document(Base):
    __tablename__ = 'documents'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    filename = Column(String, nullable=False)
    file_url = Column(String)
    doc_type = Column(String) # bank_statement, invoice, balance_sheet
    status = Column(String, default="uploaded") # uploaded, processing, parsed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="documents")
    transactions = relationship("Transaction", back_populates="document")

class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey('documents.id'))
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    transaction_date = Column(Date)
    description = Column(String, nullable=False)
    amount = Column(Numeric, nullable=False)
    type = Column(String) # credit or debit
    category = Column(String) # LLM inferred
    gst_status = Column(String) # applicable, not_applicable

    document = relationship("Document", back_populates="transactions")
    user = relationship("User", back_populates="transactions")

class TaxProfile(Base):
    __tablename__ = 'tax_profiles'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), unique=True)
    assessment_year = Column(String)
    estimated_liability = Column(Numeric, default=0.0)
    ai_recommendations = Column(JSON)

    user = relationship("User", back_populates="tax_profile")
